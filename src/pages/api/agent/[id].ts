// GENERATED CODE - DO NOT MODIFY
import { defineApi } from "@/lib/api/api-docs";
import { ApiGuard } from "@/lib/api/api-guard";
import { HookSystem } from "@/lib/modules/hooks";
import { z } from "zod";
import { AgentService } from "@modules/orchestrator-api/src/services/agent-service";
import { AgentStatus } from "@modules/orchestrator-api/src/sdk";

// GENERATED CODE - DO NOT MODIFY
export const GET = defineApi(
  async (context) => {
    const { id } = context.params;
    if (!id) return new Response(null, { status: 404 });

    // Pre-check
    await ApiGuard.protect(context, "member", { ...context.params });

    const select = {
      id: true,
      hostname: true,
      capabilities: true,
      lastHeartbeat: true,
      status: true,
      createdAt: true,
    };
    const result = await AgentService.get(id, select);

    if (!result.success || !result.data) {
      return new Response(null, { status: 404 });
    }

    // Post-check (Data ownership)
    await ApiGuard.protect(
      context,
      "member",
      { ...context.params },
      result.data,
    );

    // Analytics Hook
    const actor = (context as any).user;
    await HookSystem.dispatch("agent.viewed", {
      id,
      actorId: actor?.id || "anonymous",
    });

    return { success: true, data: result.data };
  },
  {
    summary: "Get Agent",
    tags: ["Agent"],
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
                hostname: { type: "string" },
                capabilities: { type: "array", items: { type: "string" } },
                lastHeartbeat: { type: "string", format: "date-time" },
                status: { type: "string" },
                createdAt: { type: "string", format: "date-time" },
              },
              required: ["hostname", "capabilities"],
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
    await ApiGuard.protect(context, "member", { ...context.params, ...body });

    // Fetch for Post-check ownership
    const existing = await AgentService.get(id);
    if (!existing.success || !existing.data) {
      return new Response(null, { status: 404 });
    }

    // Post-check
    await ApiGuard.protect(
      context,
      "member",
      { ...context.params, ...body },
      existing.data,
    );

    // Zod Validation
    const schema = z
      .object({
        hostname: z.string(),
        capabilities: z.array(z.string()),
        lastHeartbeat: z.string().datetime().optional(),
        status: z.nativeEnum(AgentStatus).optional(),
      })
      .partial();
    const validated = schema.parse(body);
    const select = {
      id: true,
      hostname: true,
      capabilities: true,
      lastHeartbeat: true,
      status: true,
      createdAt: true,
    };
    const actor = context.locals?.actor || (context as any).user;

    const result = await AgentService.update(id, validated, select, actor);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
      });
    }

    return { success: true, data: result.data };
  },
  {
    summary: "Update Agent",
    tags: ["Agent"],
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
              hostname: { type: "string" },
              capabilities: { type: "array", items: { type: "string" } },
              lastHeartbeat: { type: "string", format: "date-time" },
              status: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
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
                hostname: { type: "string" },
                capabilities: { type: "array", items: { type: "string" } },
                lastHeartbeat: { type: "string", format: "date-time" },
                status: { type: "string" },
                createdAt: { type: "string", format: "date-time" },
              },
              required: ["hostname", "capabilities"],
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
    await ApiGuard.protect(context, "member", { ...context.params });

    // Fetch for Post-check ownership
    const existing = await AgentService.get(id);
    if (!existing.success || !existing.data) {
      return new Response(null, { status: 404 });
    }

    // Post-check
    await ApiGuard.protect(
      context,
      "member",
      { ...context.params },
      existing.data,
    );

    const result = await AgentService.delete(id);

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
      });
    }

    return { success: true };
  },
  {
    summary: "Delete Agent",
    tags: ["Agent"],
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
