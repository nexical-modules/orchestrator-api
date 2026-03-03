// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
// Manual Action - Cancel Job
import type { APIContext } from 'astro';
import type { ServiceResponse } from '@/types/service';
import type { Job, CancelJobDTO } from '../sdk/types';
import { OrchestrationService } from '../services/orchestration-service';

/**
 * Action to cancel a job.
 */
export class CancelJobAction {
  public static async run(input: CancelJobDTO, context: APIContext): Promise<ServiceResponse<Job>> {
    const actor = context.locals.actor;
    const actorId = actor?.role === 'ADMIN' ? undefined : actor?.id;
    const result = await OrchestrationService.cancel(input.id, actorId);
    return result as ServiceResponse<Job>;
  }
}
