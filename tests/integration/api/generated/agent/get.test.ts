// GENERATED CODE - DO NOT MODIFY
import { ApiClient } from '@tests/integration/lib/client';
import { Factory } from '@tests/integration/lib/factory';
import { TestServer } from '@tests/integration/lib/server';
import { beforeEach, describe, expect, it } from 'vitest';
describe('Agent API - Get', () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // GET /api/agent/[id]
  describe('GET /api/agent/[id]', () => {
    it('should retrieve a specific agent', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });

      const target = await Factory.create('agent', {
        ...{
          hostname: 'hostname_test',
          capabilities: ['capabilities_test'],
          lastHeartbeat: new Date().toISOString(),
        },
      });

      const res = await client.get(`/api/agent/${target.id}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(target.id);
    });

    it('should return 404 for missing id', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const res = await client.get('/api/agent/missing-id-123');
      expect(res.status).toBe(404);
    });
  });
});
