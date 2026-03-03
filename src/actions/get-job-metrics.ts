// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import type { ServiceResponse } from '@/types/service';
import type { APIContext } from 'astro';
import type { JobMetrics } from '../sdk/types';
import { JobMetricsService } from '../services/job-metrics-service';

export class GetJobMetricsAction {
  public static async run(_input: void, context: APIContext): Promise<ServiceResponse<JobMetrics>> {
    const metrics = await JobMetricsService.getJobMetrics();
    return { success: true, data: metrics };
  }
}
