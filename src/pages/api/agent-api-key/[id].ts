// GENERATED CODE - DO NOT MODIFY
import { defineApi } from '@/lib/api/api-docs';
import { ApiGuard } from '@/lib/api/api-guard';
import { AgentApiKeyService } from '@modules/orchestrator-api/src/services/agent-api-key-service';

export const GET = defineApi(
  async (context, actor) => {
    const { id } = context.params;

    // Security Check
    await ApiGuard.protect(context, 'AGENT_ADMIN', { ...context.params });

    const select = {
      id: true,
      name: true,
      hashedKey: true,
      prefix: true,
      lastUsedAt: true,
      expiresAt: true,
      createdAt: true,
      agentId: true,
      agent: true,
    };
    const result = await AgentApiKeyService.get(id, select, actor);

    if (!result.success) {
      throw new Error(result.error || 'Internal Server Error');
    }

    if (!result.data) {
      throw new Error('AgentApiKey not found');
    }

    return { success: true, data: result.data };
  },
  {
    summary: 'Get AgentApiKey',
    tags: ['AgentApiKey'],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],

    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                hashedKey: { type: 'string' },
                prefix: { type: 'string' },
                lastUsedAt: { type: 'string', format: 'date-time' },
                expiresAt: { type: 'string', format: 'date-time' },
                createdAt: { type: 'string', format: 'date-time' },
                agentId: { type: 'string' },
                agent: { type: 'string' },
              },
              required: ['name', 'hashedKey', 'prefix', 'agentId', 'agent'],
            },
          },
        },
      },
    },
  },
);
