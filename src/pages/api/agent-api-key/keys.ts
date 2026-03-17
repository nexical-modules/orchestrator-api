// GENERATED CODE - DO NOT MODIFY
import { OrchestratorModuleTypes } from '@/lib/api';
import { defineApi } from '@/lib/api/api-docs';
import { ApiGuard } from '@/lib/api/api-guard';
import { HookSystem } from '@/lib/modules/hooks';
import { CreateAgentApiKeyAction } from '@modules/orchestrator-api/src/actions/create-agent-api-key';
import { z } from 'zod';

export const POST = defineApi(
  async (context, actor) => {
    // 1. Parsing Input (Body + Query + Params)
    const rawBody = await context.request.json();
    const query = Object.fromEntries(new URL(context.request.url).searchParams);
    const rawInput = { ...context.params, ...query, ...rawBody };

    const zodSchema = z.object({
      agentId: z.string(),
      name: z.string(),
      expiresAt: z.string().datetime().optional(),
    });
    const body = (
      zodSchema ? zodSchema.parse(rawInput) : rawInput
    ) as OrchestratorModuleTypes.CreateAgentApiKeyDTO;

    // 2. Hook: Filter Input
    const input: OrchestratorModuleTypes.CreateAgentApiKeyDTO = await HookSystem.filter(
      'agentApiKey.createAgentApiKey.input',
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
    const result = await CreateAgentApiKeyAction.run(combinedInput, context);

    // 5. Hook: Filter Output
    const filteredResult = await HookSystem.filter('agentApiKey.createAgentApiKey.output', result);

    // 6. Response
    if (!filteredResult.success) {
      throw new Error(filteredResult.error || 'Internal Server Error');
    }

    return { success: true, data: filteredResult.data };
  },
  {
    summary: 'Create a new agent API key',
    tags: ['AgentApiKey'],

    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              agentId: { type: 'string' },
              name: { type: 'string' },
              expiresAt: { type: 'string', format: 'date-time' },
            },
            required: ['agentId', 'name'],
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
                token: { type: 'string' },
                rawKey: { type: 'string' },
              },
              required: ['token', 'rawKey'],
            },
          },
        },
      },
    },
  },
);
