// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import type { ServiceResponse } from '@/types/service';
import type { APIContext } from 'astro';
import type { HeartbeatDTO } from '../sdk/types';
import { AgentService } from '../services/agent-service';

export class HeartbeatAgentAction {
  public static async run(
    input: HeartbeatDTO,
    context: APIContext,
  ): Promise<ServiceResponse<void>> {
    const response = await AgentService.update(input.id, {
      lastHeartbeat: new Date(),
      status: 'ONLINE',
    });

    if (!response.success) {
      return { success: false, error: response.error };
    }

    return { success: true, data: undefined };
  }
}
