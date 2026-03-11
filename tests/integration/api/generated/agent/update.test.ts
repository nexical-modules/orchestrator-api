// GENERATED CODE - DO NOT MODIFY
import { ApiClient } from '@tests/integration/lib/client';
import { Factory } from '@tests/integration/lib/factory';
import { TestServer } from '@tests/integration/lib/server';
import { beforeEach, describe, expect, it } from 'vitest';
describe('Agent API - Update', () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // PUT /api/agent/[id]
  describe('PUT /api/agent/[id]', () => {
    it('should update agent', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });

      const target = await Factory.create('agent', {
        ...{
          hostname: 'hostname_test',
          capabilities: ['capabilities_test'],
          lastHeartbeat: new Date().toISOString(),
        },
      });
      const updatePayload = {
        name: 'name_updated',
        hashedKey: 'hashedKey_updated',
        prefix: 'prefix_updated',
        hostname: 'hostname_updated',
        capabilities: ['capabilities_updated'],
        lastHeartbeat: new Date().toISOString(),
      };

      const res = await client.put(`/api/agent/${target.id}`, updatePayload);

      expect(res.status).toBe(200);

      const updated = await Factory.prisma.agent.findUnique({ where: { id: target.id } });
      expect(updated?.name).toBe(updatePayload.name);
      expect(updated?.hashedKey).toBe(updatePayload.hashedKey);
      expect(updated?.prefix).toBe(updatePayload.prefix);
      expect(updated?.hostname).toBe(updatePayload.hostname);
      expect(updated?.capabilities).toStrictEqual(updatePayload.capabilities);
      expect(updated?.lastHeartbeat.toISOString()).toBe(updatePayload.lastHeartbeat); // Compare as ISO strings
    });
  });
});
