// GENERATED CODE - DO NOT MODIFY
import { defineApi } from "@/lib/api/api-docs";
import { ApiGuard } from "@/lib/api/api-guard";
import { z } from "zod";
import { JobLogService } from "@modules/orchestrator-api/src/services/job-log-service";
import { HookSystem } from "@/lib/modules/hooks";

export const GET = defineApi(
  async (context) => {
    const { id } = context.params;
    if (!id) return new Response(null, { status: 404 });

    // Pre-check
    await ApiGuard.protect(context, "job-owner", { ...context.params });

    const select = {
      id: true,
      jobId: true,
      level: true,
      message: true,
      timestamp: true,
      job: true,
    };
    const result = await JobLogService.get(id, select);

    if (!result.success || !result.data) {
      return new Response(null, { status: 404 });
    }

    // Post-check (Data ownership)
    await ApiGuard.protect(
      context,
      "job-owner",
      { ...context.params },
      result.data,
    );

    // Analytics Hook
    const actor = (context as any).user;
    await HookSystem.dispatch("jobLog.viewed", {
      id,
      actorId: actor?.id || "anonymous",
    });

    return { success: true, data: result.data };
  },
  {
    summary: "Get JobLog",
    tags: ["JobLog"],
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "string" } },
    ],
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: { type: "string" },
                jobId: { type: "string" },
                level: { type: "string" },
                message: { type: "string" },
                timestamp: { type: "string", format: "date-time" },
                job: { type: "string" },
              },
              required: ["jobId", "message", "job"],
            },
          },
        },
      },
    },
  },
);
export const PUT = defineApi(
  async (context) => {
    const { id } = context.params;
    if (!id) return new Response(null, { status: 404 });

    const body = await context.request.json();

    // Pre-check
    await ApiGuard.protect(context, "job-owner", {
      ...context.params,
      ...body,
    });

    // Fetch for Post-check ownership
    const existing = await JobLogService.get(id);
    if (!existing.success || !existing.data) {
      return new Response(null, { status: 404 });
    }

    // Post-check
    await ApiGuard.protect(
      context,
      "job-owner",
      { ...context.params, ...body },
      existing.data,
    );

    // Zod Validation
    const schema = z
      .object({
        jobId: z.string(),
        level: z.string().optional(),
        message: z.string(),
        timestamp: z.string().datetime().optional(),
      })
      .partial();
    const validated = schema.parse(body);
    const select = {
      id: true,
      jobId: true,
      level: true,
      message: true,
      timestamp: true,
      job: true,
    };
    const actor = context.locals?.actor || (context as any).user;

    const result = await JobLogService.update(id, validated, select, actor);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
      });
    }

    return { success: true, data: result.data };
  },
  {
    summary: "Update JobLog",
    tags: ["JobLog"],
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "string" } },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "string" },
              jobId: { type: "string" },
              level: { type: "string" },
              message: { type: "string" },
              timestamp: { type: "string", format: "date-time" },
              job: { type: "string" },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: { type: "string" },
                jobId: { type: "string" },
                level: { type: "string" },
                message: { type: "string" },
                timestamp: { type: "string", format: "date-time" },
                job: { type: "string" },
              },
              required: ["jobId", "message", "job"],
            },
          },
        },
      },
    },
  },
);
export const DELETE = defineApi(
  async (context) => {
    const { id } = context.params;
    if (!id) return new Response(null, { status: 404 });

    // Pre-check
    await ApiGuard.protect(context, "job-owner", { ...context.params });

    // Fetch for Post-check ownership
    const existing = await JobLogService.get(id);
    if (!existing.success || !existing.data) {
      return new Response(null, { status: 404 });
    }

    // Post-check
    await ApiGuard.protect(
      context,
      "job-owner",
      { ...context.params },
      existing.data,
    );

    const result = await JobLogService.delete(id);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
      });
    }

    return { success: true };
  },
  {
    summary: "Delete JobLog",
    tags: ["JobLog"],
    parameters: [
      { name: "id", in: "path", required: true, schema: { type: "string" } },
    ],
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: { type: "boolean" },
              },
            },
          },
        },
      },
    },
  },
);
