// GENERATED CODE - DO NOT MODIFY
import { describe, it, expect, beforeEach } from "vitest";
import { ApiClient } from "@tests/integration/lib/client";
import { Factory } from "@tests/integration/lib/factory";
import { TestServer } from "@tests/integration/lib/server";

const _test = describe("Agent API - Update", () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // PUT /api/agent/[id]
  describe("PUT /api/agent/[id]", () => {
    it("should update agent", async () => {
      const actor = await client.as("team", {});

      const target = await Factory.create("agent", {
        ...{
          hostname: "hostname_test",
          capabilities: ["capabilities_test"],
          lastHeartbeat: new Date().toISOString(),
        },
      });

      const updatePayload = {
        hostname: "hostname_updated",
        capabilities: ["capabilities_updated"],
        lastHeartbeat: new Date().toISOString(),
      };

      const res = await client.put(`/api/agent/${target.id}`, updatePayload);

      expect(res.status).toBe(200);

      const updated = await Factory.prisma.agent.findUnique({
        where: { id: target.id },
      });
      expect(updated?.hostname).toBe(updatePayload.hostname);
      expect(updated?.capabilities).toStrictEqual(updatePayload.capabilities);
      expect(updated?.lastHeartbeat.toISOString()).toBe(
        updatePayload.lastHeartbeat,
      ); // Compare as ISO strings
    });
  });
});
