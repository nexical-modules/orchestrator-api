// GENERATED CODE - DO NOT MODIFY
import { describe, it, expect, beforeEach } from "vitest";
import { ApiClient } from "@tests/integration/lib/client";
import { Factory } from "@tests/integration/lib/factory";
import { TestServer } from "@tests/integration/lib/server";

const _test = describe("Agent API - Get", () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // GET /api/agent/[id]
  describe("GET /api/agent/[id]", () => {
    it("should retrieve a specific agent", async () => {
      const actor = await client.as("team", {});

      const target = await Factory.create("agent", {
        ...{
          hostname: "hostname_test",
          capabilities: ["capabilities_test"],
          lastHeartbeat: new Date().toISOString(),
        },
      });

      const res = await client.get(`/api/agent/${target.id}`);

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(target.id);
    });

    it("should return 404 for missing id", async () => {
      const actor = await client.as("team", {});
      const res = await client.get("/api/agent/missing-id-123");
      expect(res.status).toBe(404);
    });
  });
});
