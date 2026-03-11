// GENERATED CODE - DO NOT MODIFY
import { ApiClient } from '@tests/integration/lib/client';
import { Factory } from '@tests/integration/lib/factory';
import { TestServer } from '@tests/integration/lib/server';
import { beforeEach, describe, expect, it } from 'vitest';
describe('Job API - Get', () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // GET /api/job/[id]
  describe('GET /api/job/[id]', () => {
    it('should retrieve a specific job', async () => {
      const actor = await client.as('user', { role: 'USER_EMPLOYEE' });

      const target = await Factory.create('job', {
        ...{ type: 'type_test', progress: 10, retryCount: 10, maxRetries: 10 },
        actorId: actor.id,
        actorType: 'user',
      });

      const res = await client.get(`/api/job/${target.id}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(target.id);
    });

    it('should return 404 for missing id', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_EMPLOYEE' });
      const res = await client.get('/api/job/missing-id-123');
      expect(res.status).toBe(404);
    });
  });
});
