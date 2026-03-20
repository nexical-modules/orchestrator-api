// GENERATED CODE - DO NOT MODIFY
import { defineApi } from '@/lib/api/api-docs';
import { ApiGuard } from '@/lib/api/api-guard';
import { DeadLetterJobService } from '@modules/orchestrator-api/src/services/dead-letter-job-service';
import { z } from 'zod';

export const GET = defineApi(
  async (context, actor) => {
    const { id } = context.params;

    // Security Check
    await ApiGuard.protect(context, 'AGENT_ADMIN', { ...context.params });

    const select = {
      id: true,
      originalJobId: true,
      type: true,
      payload: true,
      error: true,
      failedAt: true,
      retryCount: true,
      reason: true,
      actorId: true,
      actorType: true,
    };
    const result = await DeadLetterJobService.get(id, select, actor);

    if (!result.success) {
      throw new Error(result.error || 'Internal Server Error');
    }

    if (!result.data) {
      throw new Error('DeadLetterJob not found');
    }

    return { success: true, data: result.data };
  },
  {
    summary: 'Get DeadLetterJob',
    tags: ['DeadLetterJob'],
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
                originalJobId: { type: 'string' },
                type: { type: 'string' },
                payload: { type: 'object' },
                error: { type: 'object' },
                failedAt: { type: 'string', format: 'date-time' },
                retryCount: { type: 'number' },
                reason: { type: 'string' },
                actorId: { type: 'string' },
                actorType: { type: 'string' },
              },
              required: ['originalJobId', 'type', 'retryCount'],
            },
          },
        },
      },
    },
  },
);
export const PUT = defineApi(
  async (context, actor) => {
    const { id } = context.params;
    const body = await context.request.json();

    // Security Check
    await ApiGuard.protect(context, 'AGENT_ADMIN', { ...context.params, ...body });

    // Zod Validation
    const schema = z.object({
      id: z.string().optional(),
      originalJobId: z.string(),
      type: z.string(),
      payload: z.unknown().optional(),
      error: z.unknown().optional(),
      failedAt: z.string().datetime().optional(),
      retryCount: z.coerce.number().int(),
      reason: z.string().optional(),
      actorId: z.string().optional(),
      actorType: z.string().optional(),
    });
    const validated = schema.parse(body);
    const select = {
      id: true,
      originalJobId: true,
      type: true,
      payload: true,
      error: true,
      failedAt: true,
      retryCount: true,
      reason: true,
      actorId: true,
      actorType: true,
    };
    const result = await DeadLetterJobService.update(id, validated, select, actor);

    if (!result.success) {
      throw new Error(result.error || 'Internal Server Error');
    }

    return new Response(JSON.stringify({ success: true, data: result.data }), { status: 200 });
  },
  {
    summary: 'Update DeadLetterJob',
    tags: ['DeadLetterJob'],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              originalJobId: { type: 'string' },
              type: { type: 'string' },
              payload: { type: 'object' },
              error: { type: 'object' },
              failedAt: { type: 'string', format: 'date-time' },
              retryCount: { type: 'number' },
              reason: { type: 'string' },
              actorId: { type: 'string' },
              actorType: { type: 'string' },
            },
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
                originalJobId: { type: 'string' },
                type: { type: 'string' },
                payload: { type: 'object' },
                error: { type: 'object' },
                failedAt: { type: 'string', format: 'date-time' },
                retryCount: { type: 'number' },
                reason: { type: 'string' },
                actorId: { type: 'string' },
                actorType: { type: 'string' },
              },
              required: ['originalJobId', 'type', 'retryCount'],
            },
          },
        },
      },
    },
  },
);
export const DELETE = defineApi(
  async (context, actor) => {
    const { id } = context.params;

    // Security Check
    await ApiGuard.protect(context, 'AGENT_ADMIN', { ...context.params });

    const result = await DeadLetterJobService.delete(id, actor);

    if (!result.success) {
      throw new Error(result.error || 'Internal Server Error');
    }

    return { success: true };
  },
  {
    summary: 'Delete DeadLetterJob',
    tags: ['DeadLetterJob'],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],

    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: { type: 'boolean' },
              },
            },
          },
        },
      },
    },
  },
);
