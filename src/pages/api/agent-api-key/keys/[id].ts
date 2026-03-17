// GENERATED CODE - DO NOT MODIFY
import { OrchestratorModuleTypes } from '@/lib/api';
import { defineApi } from '@/lib/api/api-docs';
import { ApiGuard } from '@/lib/api/api-guard';
import { HookSystem } from '@/lib/modules/hooks';
import { DeleteAgentApiKeyAction } from '@modules/orchestrator-api/src/actions/delete-agent-api-key';
import { z } from 'zod';

export const DELETE = defineApi(
  async (context, actor) => {
    // 1. Parsing Input (Body + Query + Params)
    const rawBody = await context.request.json();
    const query = Object.fromEntries(new URL(context.request.url).searchParams);
    const rawInput = { ...context.params, ...query, ...rawBody };

    const zodSchema = z.object({
      id: z.string(),
      agentId: z.string().optional(),
    });
    const body = (
      zodSchema ? zodSchema.parse(rawInput) : rawInput
    ) as OrchestratorModuleTypes.DeleteAgentApiKeyDTO;

    // 2. Hook: Filter Input
    const input: OrchestratorModuleTypes.DeleteAgentApiKeyDTO = await HookSystem.filter(
      'agentApiKey.deleteAgentApiKey.input',
      body,
    );

    // 3. Security Check
    const combinedInput = { ...input }; // input already contains params, query and body
    await ApiGuard.protect(context, 'AGENT_ADMIN', combinedInput);

    // Inject userId from context for protected routes
    if (actor && actor.id) {
      Object.assign(combinedInput, { userId: actor.id });
    }

    // 4. Action Execution
    const result = await DeleteAgentApiKeyAction.run(combinedInput, context);

    // 5. Hook: Filter Output
    const filteredResult = await HookSystem.filter('agentApiKey.deleteAgentApiKey.output', result);

    // 6. Response
    if (!filteredResult.success) {
      throw new Error(filteredResult.error || 'Internal Server Error');
    }

    return { success: true, data: filteredResult.data };
  },
  {
    summary: 'Delete an agent API key',
    tags: ['AgentApiKey'],

    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              agentId: { type: 'string' },
            },
            required: ['id'],
          },
        },
      },
    },
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
