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
      if (
        result.error?.code === 'NOT_FOUND' ||
        (typeof result.error === 'string' && result.error.includes('not_found'))
      ) {
        return new Response(JSON.stringify({ error: result.error }), { status: 404 });
      }
      return new Response(JSON.stringify({ error: result.error }), { status: 500 });
    }

    if (!result.data) {
      return new Response(
        JSON.stringify({ error: { code: 'NOT_FOUND', message: 'AgentApiKey not found' } }),
        { status: 404 },
      );
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
