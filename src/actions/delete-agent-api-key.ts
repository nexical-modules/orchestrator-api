// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import { roleRegistry } from '@/lib/registries/role-registry';
import type { ServiceResponse } from '@/types/service';
import type { APIContext } from 'astro';
import type { AgentApiKey, DeleteAgentApiKeyDTO } from '../sdk/types';
import { AgentApiKeyService } from '../services/agent-api-key-service';

export class DeleteAgentApiKeyAction {
  public static async run(
    input: DeleteAgentApiKeyDTO,
    context: APIContext,
  ): Promise<ServiceResponse<AgentApiKey>> {
    const userId = (context.locals.actor as { id: string } | undefined)?.id;

    if (!userId) return { success: false, error: 'Unauthorized' };

    try {
      await roleRegistry.check('AGENT_ADMIN', context, {});

      const keyToReturn = await AgentApiKeyService.get(input.id);
      const result = await AgentApiKeyService.delete(input.id);

      if (!result.success) {
        return {
          success: false,
          error: result.error || 'Failed to delete agent API key',
        };
      }

      return { success: true, data: keyToReturn.data as AgentApiKey };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return { success: false, error: message };
    }
  }
}
