// GENERATED CODE - DO NOT MODIFY
import { defineApi } from '@/lib/api/api-docs';
import { ApiGuard } from '@/lib/api/api-guard';
import { HookSystem } from '@/lib/modules/hooks';
import { GetJobMetricsAction } from '@modules/orchestrator-api/src/actions/get-job-metrics';
export const GET = defineApi(
  async (context, actor) => {
    // 1. Parsing Input (Body + Query + Params)
    const rawBody = {};
    const query = Object.fromEntries(new URL(context.request.url).searchParams);
    const rawInput = { ...context.params, ...query, ...rawBody };

    const zodSchema = null;
    const body = (zodSchema ? zodSchema.parse(rawInput) : rawInput) as unknown;

    // 2. Hook: Filter Input
    const input: unknown = await HookSystem.filter('metrics.getJobMetrics.input', body);

    // 3. Security Check
    const combinedInput = { ...input }; // input already contains params, query and body
    await ApiGuard.protect(context, 'AGENT_ADMIN', combinedInput);

    // Inject userId from context for protected routes
    if (actor && actor.id) {
      Object.assign(combinedInput, { userId: actor.id });
    }

    // 4. Action Execution
    const result = await GetJobMetricsAction.run(combinedInput, context);

    // 5. Hook: Filter Output
    const filteredResult = await HookSystem.filter('metrics.getJobMetrics.output', result);

    // 6. Response
    if (!filteredResult.success) {
      throw new Error(filteredResult.error || 'Internal Server Error');
    }

    return { success: true, data: filteredResult.data };
  },
  {
    summary: 'Get job metrics',
    tags: ['Metrics'],

    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                total: { type: 'number' },
                pending: { type: 'number' },
                running: { type: 'number' },
                completed: { type: 'number' },
                failed: { type: 'number' },
                cancelled: { type: 'number' },
                avgCompletionTimeMs: { type: 'number' },
                retryRate: { type: 'number' },
                successRate: { type: 'number' },
              },
              required: [
                'total',
                'pending',
                'running',
                'completed',
                'failed',
                'cancelled',
                'retryRate',
                'successRate',
              ],
            },
          },
        },
      },
    },
  },
);
