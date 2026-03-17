import { db } from '@/lib/core/db';
import { Logger } from '@/lib/core/logger';
import { HookSystem } from '@/lib/modules/hooks';

/**
 * Job metrics snapshot for dashboard and monitoring.
 */
export interface JobMetrics {
  total: number;
  pending: number;
  running: number;
  completed: number;
  failed: number;
  cancelled: number;
  avgCompletionTimeMs?: number;
  retryRate: number;
  successRate: number;
}

/**
 * Agent metrics snapshot for dashboard and monitoring.
 */
export interface AgentMetrics {
  total: number;
  online: number;
  offline: number;
  busy: number;
  jobsProcessedLast24h: number;
}

/**
 * Service for collecting and exposing job/agent metrics.
 * Can be polled by dashboards or used by monitoring hooks.
 */
export class JobMetricsService {
  /**
   * Get current job metrics snapshot.
   */
  static async getJobMetrics(): Promise<ServiceResponse<JobMetrics>> {
    try {
      const [total, statusCounts, _avgData, retryData] = await Promise.all([
        db.job.count(),
        db.job.groupBy({
          by: ['status'],
          _count: { id: true },
        }),
        db.job.aggregate({
          where: {
            status: 'COMPLETED',
            startedAt: { not: null },
            completedAt: { not: null },
          },
          _avg: {
            progress: true,
          },
        }),
        db.job.count({
          where: {
            retryCount: { gt: 0 },
          },
        }),
      ]);

      const statusMap: Record<string, number> = {};
      for (const s of statusCounts) {
        statusMap[s.status] = s._count.id;
      }

      const pending = statusMap['PENDING'] || 0;
      const running = statusMap['RUNNING'] || 0;
      const completed = statusMap['COMPLETED'] || 0;
      const failed = statusMap['FAILED'] || 0;
      const cancelled = statusMap['CANCELLED'] || 0;

      // Calculate rates
      const finishedJobs = completed + failed;
      const successRate = finishedJobs > 0 ? completed / finishedJobs : 0;
      const retryRate = total > 0 ? retryData / total : 0;

      // Calculate avg completion time (need raw SQL or compute differently)
      // For simplicity, we'll estimate using recent completed jobs
      const avgCompletionTimeMs = undefined; // Would require date math in query

      return {
        success: true,
        data: {
          total,
          pending,
          running,
          completed,
          failed,
          cancelled,
          avgCompletionTimeMs,
          retryRate,
          successRate,
        },
      };
    } catch (error) {
      Logger.error('JobMetricsService.getJobMetrics Error:', error);
      return { success: false, error: 'jobMetrics.service.error.get_failed' };
    }
  }

  /**
   * Get current agent metrics snapshot.
   */
  static async getAgentMetrics(): Promise<ServiceResponse<AgentMetrics>> {
    try {
      const [total, statusCounts, jobsLast24h] = await Promise.all([
        db.agent.count(),
        db.agent.groupBy({
          by: ['status'],
          _count: { id: true },
        }),
        db.job.count({
          where: {
            status: 'COMPLETED',
            completedAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          },
        }),
      ]);

      const statusMap: Record<string, number> = {};
      for (const s of statusCounts) {
        statusMap[s.status] = s._count.id;
      }

      return {
        success: true,
        data: {
          total,
          online: statusMap['ONLINE'] || 0,
          offline: statusMap['OFFLINE'] || 0,
          busy: statusMap['BUSY'] || 0,
          jobsProcessedLast24h: jobsLast24h,
        },
      };
    } catch (error) {
      Logger.error('JobMetricsService.getAgentMetrics Error:', error);
      return { success: false, error: 'agentMetrics.service.error.get_failed' };
    }
  }

  /**
   * Emit metrics to dashboard hooks for real-time updates.
   */
  static async emitMetrics(): Promise<void> {
    const [jobRes, agentRes] = await Promise.all([this.getJobMetrics(), this.getAgentMetrics()]);

    if (!jobRes.success || !agentRes.success) {
      Logger.error('JobMetricsService.emitMetrics Failed: Could not fetch metrics');
      return;
    }

    await HookSystem.dispatch('orchestrator.metrics', {
      jobs: jobRes.data,
      agents: agentRes.data,
      timestamp: new Date().toISOString(),
    });

    Logger.debug('JobMetricsService: Metrics emitted', {
      jobs: jobRes.data,
      agents: agentRes.data,
    });
  }
}
