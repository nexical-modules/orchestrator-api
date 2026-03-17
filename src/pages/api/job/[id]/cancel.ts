// GENERATED CODE - DO NOT MODIFY
import { OrchestratorModuleTypes } from '@/lib/api';
import { defineApi } from '@/lib/api/api-docs';
import { ApiGuard } from '@/lib/api/api-guard';
import { HookSystem } from '@/lib/modules/hooks';
import { CancelJobAction } from '@modules/orchestrator-api/src/actions/cancel-job';
import { z } from 'zod';

export const POST = defineApi(
  async (context, actor) => {
    // 1. Parsing Input (Body + Query + Params)
    const rawBody = await context.request.json();
    const query = Object.fromEntries(new URL(context.request.url).searchParams);
    const rawInput = { ...context.params, ...query, ...rawBody };

    const zodSchema = z.object({
      id: z.string(),
    });
    const body = (
      zodSchema ? zodSchema.parse(rawInput) : rawInput
    ) as OrchestratorModuleTypes.CancelJobDTO;

    // 2. Hook: Filter Input
    const input: OrchestratorModuleTypes.CancelJobDTO = await HookSystem.filter(
      'job.cancelJob.input',
      body,
    );

    // 3. Security Check
    const combinedInput = { ...input }; // input already contains params, query and body
    await ApiGuard.protect(context, 'AGENT_JOB_OWNER', combinedInput);

    // Inject userId from context for protected routes
    if (actor && actor.id) {
      Object.assign(combinedInput, { userId: actor.id });
    }

    // 4. Action Execution
    const result = await CancelJobAction.run(combinedInput, context);

    // 5. Hook: Filter Output
    const filteredResult = await HookSystem.filter('job.cancelJob.output', result);

    // 6. Response
    if (!filteredResult.success) {
      throw new Error(filteredResult.error || 'Internal Server Error');
    }

    return { success: true, data: filteredResult.data };
  },
  {
    summary: 'Cancel a job',
    tags: ['Job'],

    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
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
                type: { type: 'string' },
                userId: { type: 'string' },
                actorId: { type: 'string' },
                actorType: { type: 'string' },
                payload: { type: 'object' },
                result: { type: 'object' },
                error: { type: 'object' },
                status: { type: 'string' },
                progress: { type: 'number' },
                lockedBy: { type: 'string' },
                lockedAt: { type: 'string', format: 'date-time' },
                startedAt: { type: 'string', format: 'date-time' },
                completedAt: { type: 'string', format: 'date-time' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                retryCount: { type: 'number' },
                maxRetries: { type: 'number' },
                nextRetryAt: { type: 'string', format: 'date-time' },
                logs: { type: 'array', items: { type: 'string' } },
              },
              required: ['type', 'updatedAt', 'logs'],
            },
          },
        },
      },
    },
  },
);
