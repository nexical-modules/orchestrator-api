// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import { randomBytes, createHash } from 'node:crypto';
import { roleRegistry } from '@/lib/registries/role-registry';
import { AgentApiKeyService } from '../services/agent-api-key-service';
import type { ServiceResponse } from '@/types/service';
import type { APIContext } from 'astro';
import type { CreateAgentApiKeyDTO, CreateAgentApiKeyResponseDTO } from '../sdk/types';

export class CreateAgentApiKeyAction {
  private static KEY_PREFIX = 'sk_agent_';

  public static async run(
    input: CreateAgentApiKeyDTO,
    context: APIContext,
  ): Promise<ServiceResponse<CreateAgentApiKeyResponseDTO>> {
    const { agentId, name, expiresAt } = input;
    const userId = (context.locals.actor as { id: string } | undefined)?.id;

    if (!userId) return { success: false, error: 'Unauthorized' };

    try {
      await roleRegistry.check('AGENT_ADMIN', context, {});

      const randomHex = randomBytes(32).toString('hex');
      const rawKey = `${this.KEY_PREFIX}${randomHex}`;
      const hashedKey = createHash('sha256').update(rawKey).digest('hex');

      const result = await AgentApiKeyService.create({
        agent: { connect: { id: agentId } },
        name,
        hashedKey,
        prefix: this.KEY_PREFIX,
        expiresAt,
      });

      if (!result.success || !result.data) {
        return {
          success: false,
          error: result.error || 'Failed to create agent API key',
        };
      }

      return {
        success: true,
        data: {
          token: result.data,
          rawKey,
        },
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return { success: false, error: message };
    }
  }
}
