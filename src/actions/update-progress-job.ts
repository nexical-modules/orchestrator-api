// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
// Manual Action - Update Job Progress
import type { ServiceResponse } from '@/types/service';
import type { APIContext } from 'astro';
import type { UpdateProgressDTO } from '../sdk/types';
import { OrchestrationService } from '../services/orchestration-service';

/**
 * Action to update job progress.
 */
export class UpdateProgressJobAction {
  public static async run(
    input: UpdateProgressDTO,
    context: APIContext,
  ): Promise<ServiceResponse<void>> {
    const actor = context.locals.actor;
    const actorId = ['ADMIN', 'USER_ADMIN'].includes(actor?.role as string) ? undefined : actor?.id;

    const result = await OrchestrationService.updateProgress(input.id, input.progress, actorId);

    return result.success ? { success: true } : { success: false, error: result.error };
  }
}
