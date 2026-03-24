// GENERATED CODE - DO NOT MODIFY
import { OrchestratorModuleTypes } from '@/lib/api';
import { defineApi } from '@/lib/api/api-docs';
import { ApiGuard } from '@/lib/api/api-guard';
import { HookSystem } from '@/lib/modules/hooks';
import { RegisterAgentAction } from '@modules/orchestrator-api/src/actions/register-agent';
import { z } from 'zod';

export const POST = defineApi(
  async (context, actor) => {
    // 1. Parsing Input (Body + Query + Params)
    const rawBody = await context.request.json();
    const query = Object.fromEntries(new URL(context.request.url).searchParams);
    const rawInput = { ...context.params, ...query, ...rawBody };

    const zodSchema = z.object({
      id: z.string().optional(),
      name: z.string().optional(),
      hostname: z.string(),
      capabilities: z.array(z.string()),
    });
    const body = (
      zodSchema ? zodSchema.parse(rawInput) : rawInput
    ) as OrchestratorModuleTypes.RegisterAgentDTO;

    // 2. Hook: Filter Input
    const input: OrchestratorModuleTypes.RegisterAgentDTO = await HookSystem.filter(
      'agent.registerAgent.input',
      body,
    );

    // 3. Security Check
    const combinedInput = { ...input }; // input already contains params, query and body
    await ApiGuard.protect(context, 'PUBLIC', combinedInput);

    // Inject userId from context for protected routes
    if (actor && actor.id) {
      Object.assign(combinedInput, { userId: actor.id });
    }

    // 4. Action Execution
    const result = await RegisterAgentAction.run(combinedInput, context);

    // 5. Hook: Filter Output
    const filteredResult = await HookSystem.filter('agent.registerAgent.output', result);

    // 6. Response
    if (!filteredResult.success) {
      throw new Error(filteredResult.error || 'Internal Server Error');
    }

    return { success: true, data: filteredResult.data };
  },
  {
    summary: 'Register or update an agent',
    tags: ['Agent'],

    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              hostname: { type: 'string' },
              capabilities: { type: 'array', items: { type: 'string' } },
            },
            required: ['hostname', 'capabilities'],
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
                hostname: { type: 'string' },
                capabilities: { type: 'array', items: { type: 'string' } },
                lastHeartbeat: { type: 'string', format: 'date-time' },
                status: { type: 'string' },
                role: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                apiKeys: { type: 'array', items: { type: 'string' } },
              },
              required: ['hostname', 'capabilities', 'apiKeys'],
            },
          },
        },
      },
    },
    protected: false,
  },
);
