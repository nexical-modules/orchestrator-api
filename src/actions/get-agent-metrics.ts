// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import type { ServiceResponse } from '@/types/service';
import type { APIContext } from 'astro';
import type { AgentMetrics } from '../sdk/types';
import { JobMetricsService } from '../services/job-metrics-service';

export class GetAgentMetricsAction {
  public static async run(
    _input: void,
    context: APIContext,
  ): Promise<ServiceResponse<AgentMetrics>> {
    try {
      const result = await JobMetricsService.getAgentMetrics();
      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return { success: false, error: message || 'Failed to fetch agent metrics' };
    }
  }
}
