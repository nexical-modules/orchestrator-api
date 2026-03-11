// GENERATED CODE - DO NOT MODIFY
import { ApiClient } from '@tests/integration/lib/client';
import { Factory } from '@tests/integration/lib/factory';
import { TestServer } from '@tests/integration/lib/server';
import { beforeEach, describe, expect, it } from 'vitest';
describe('Agent API - Delete', () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // DELETE /api/agent/[id]
  describe('DELETE /api/agent/[id]', () => {
    it('should delete agent', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });

      const target = await Factory.create('agent', {
        ...{
          hostname: 'hostname_test',
          capabilities: ['capabilities_test'],
          lastHeartbeat: new Date().toISOString(),
        },
      });

      const res = await client.delete(`/api/agent/${target.id}`);

      expect(res.status).toBe(200);

      const check = await Factory.prisma.agent.findUnique({ where: { id: target.id } });
      expect(check).toBeNull();
    });
  });
});
