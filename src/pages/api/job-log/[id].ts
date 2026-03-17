// GENERATED CODE - DO NOT MODIFY
import { defineApi } from '@/lib/api/api-docs';
import { ApiGuard } from '@/lib/api/api-guard';
import { JobLogService } from '@modules/orchestrator-api/src/services/job-log-service';
import { z } from 'zod';

export const GET = defineApi(
  async (context, actor) => {
    const { id } = context.params;

    // Security Check
    await ApiGuard.protect(context, 'AGENT_JOB_OWNER', { ...context.params });

    const select = {
      id: true,
      jobId: true,
      level: true,
      message: true,
      timestamp: true,
      job: true,
    };
    const result = await JobLogService.get(id, select, actor);

    if (!result.success) {
      throw new Error(result.error || 'Internal Server Error');
    }

    if (!result.data) {
      throw new Error('JobLog not found');
    }

    return { success: true, data: result.data };
  },
  {
    summary: 'Get JobLog',
    tags: ['JobLog'],
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
                jobId: { type: 'string' },
                level: { type: 'string' },
                message: { type: 'string' },
                timestamp: { type: 'string', format: 'date-time' },
                job: { type: 'string' },
              },
              required: ['jobId', 'message', 'job'],
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
    await ApiGuard.protect(context, 'AGENT_JOB_OWNER', { ...context.params, ...body });

    // Zod Validation
    const schema = z.object({
      id: z.string().optional(),
      jobId: z.string(),
      level: z.string().optional(),
      message: z.string(),
      timestamp: z.string().datetime().optional(),
    });
    const validated = schema.parse(body);
    const select = {
      id: true,
      jobId: true,
      level: true,
      message: true,
      timestamp: true,
      job: true,
    };
    const result = await JobLogService.update(id, validated, select, actor);

    if (!result.success) {
      throw new Error(result.error || 'Internal Server Error');
    }

    return new Response(JSON.stringify({ success: true, data: result.data }), { status: 200 });
  },
  {
    summary: 'Update JobLog',
    tags: ['JobLog'],
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              jobId: { type: 'string' },
              level: { type: 'string' },
              message: { type: 'string' },
              timestamp: { type: 'string', format: 'date-time' },
              job: { type: 'string' },
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
                jobId: { type: 'string' },
                level: { type: 'string' },
                message: { type: 'string' },
                timestamp: { type: 'string', format: 'date-time' },
                job: { type: 'string' },
              },
              required: ['jobId', 'message', 'job'],
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
    await ApiGuard.protect(context, 'AGENT_JOB_OWNER', { ...context.params });

    const result = await JobLogService.delete(id, actor);

    if (!result.success) {
      throw new Error(result.error || 'Internal Server Error');
    }

    return { success: true };
  },
  {
    summary: 'Delete JobLog',
    tags: ['JobLog'],
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
