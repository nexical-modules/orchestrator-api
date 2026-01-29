// GENERATED CODE - DO NOT MODIFY
import { describe, it, expect, beforeEach } from "vitest";
import { ApiClient } from "@tests/integration/lib/client";
import { Factory } from "@tests/integration/lib/factory";
import { TestServer } from "@tests/integration/lib/server";

const _test = describe("Agent API - Create", () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // POST /api/agent
  describe("POST /api/agent", () => {
    it("should allow member to create agent", async () => {
      const actor = await client.as("team", {});

      const payload = {
        hostname: "hostname_test",
        capabilities: ["capabilities_test"],
        lastHeartbeat: new Date().toISOString(),
      };

      const res = await client.post("/api/agent", payload);

      expect(res.status).toBe(201);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.hostname).toBe(payload.hostname);
      expect(res.body.data.capabilities).toStrictEqual(payload.capabilities);
      expect(res.body.data.lastHeartbeat).toBe(payload.lastHeartbeat); // API returns ISO string

      const created = await Factory.prisma.agent.findUnique({
        where: { id: res.body.data.id },
      });
      expect(created).toBeDefined();
    });

    it("should forbid non-admin/unauthorized users", async () => {
      (client as any).bearerToken = "invalid-token";
      const actor = undefined as any;

      const payload = {
        hostname: "hostname_test",
        capabilities: ["capabilities_test"],
        lastHeartbeat: new Date().toISOString(),
      };
      const res = await client.post("/api/agent", payload);
      expect([401, 403, 404]).toContain(res.status);
    });
  });
});
