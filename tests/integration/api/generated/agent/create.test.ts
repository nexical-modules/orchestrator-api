// GENERATED CODE - DO NOT MODIFY
import { ApiClient } from '@tests/integration/lib/client';
import { Factory } from '@tests/integration/lib/factory';
import { TestServer } from '@tests/integration/lib/server';
import { beforeEach, describe, expect, it } from 'vitest';
describe('Agent API - Create', () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // POST /api/agent
  describe('POST /api/agent', () => {
    it('should allow AGENT_ADMIN to create agent', async () => {
      const _actor = await client.as('user', { role: 'USER_ADMIN' });

      const payload = {
        hostname: 'hostname_test',
        capabilities: ['capabilities_test'],
        lastHeartbeat: new Date().toISOString(),
      };

      const res = await client.post('/api/agent', payload);

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

    it('should forbid non-admin/unauthorized users', async () => {
      client.useToken('invalid-token');
      const _actor = undefined as unknown;

      const payload = {
        hostname: 'hostname_test',
        capabilities: ['capabilities_test'],
        lastHeartbeat: new Date().toISOString(),
      };
      const res = await client.post('/api/agent', payload);
      expect([401, 403, 404]).toContain(res.status);
    });
  });
});
