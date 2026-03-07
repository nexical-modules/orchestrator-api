// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import type { ServiceResponse } from '@/types/service';
import type { APIContext } from 'astro';
import type { RegisterAgentDTO, Agent } from '../sdk/types';
import { db } from '@/lib/core/db';

export class RegisterAgentAction {
  public static async run(
    input: RegisterAgentDTO,
    context: APIContext,
  ): Promise<ServiceResponse<Agent>> {
    const id = input.id || 'default-agent';
    try {
      const agent = await db.agent.upsert({
        where: { id },
        update: {
          name: input.name,
          hostname: input.hostname,
          capabilities: input.capabilities,
          status: 'ONLINE',
          lastHeartbeat: new Date(),
        },
        create: {
          id,
          name: input.name,
          hostname: input.hostname,
          capabilities: input.capabilities,
          status: 'ONLINE',
          lastHeartbeat: new Date(),
        },
      });
      return { success: true, data: agent as unknown as Agent };
    } catch (error) {
      console.error('RegisterAgent Error:', error);
      return {
        success: false,
        error: 'agent.service.error.registration_failed',
      };
    }
  }
}
