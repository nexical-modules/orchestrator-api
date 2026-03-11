// GENERATED CODE - DO NOT MODIFY
import { ApiClient } from '@tests/integration/lib/client';
import { Factory } from '@tests/integration/lib/factory';
import { TestServer } from '@tests/integration/lib/server';
import { beforeEach, describe, expect, it } from 'vitest';
describe('DeadLetterJob API - Update', () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // PUT /api/dead-letter-job/[id]
  describe('PUT /api/dead-letter-job/[id]', () => {
    it('should update deadLetterJob', async () => {
      const actor = await client.as('user', { role: 'USER_ADMIN' });

      const target = await Factory.create('deadLetterJob', {
        ...{
          originalJobId: 'originalJobId_test',
          type: 'type_test',
          failedAt: new Date().toISOString(),
          retryCount: 10,
        },
        actorId: actor.id,
        actorType: 'user',
      });
      const updatePayload = {
        ...{
          originalJobId: 'originalJobId_updated',
          type: 'type_updated',
          failedAt: new Date().toISOString(),
          retryCount: 20,
          reason: 'reason_updated',
        },
        actorId: actor ? (actor as unknown as { id: string }).id : undefined,
      };

      const res = await client.put(`/api/dead-letter-job/${target.id}`, updatePayload);

      expect(res.status).toBe(200);

      const updated = await Factory.prisma.deadLetterJob.findUnique({ where: { id: target.id } });
      expect(updated?.originalJobId).toBe(updatePayload.originalJobId);
      expect(updated?.type).toBe(updatePayload.type);
      expect(updated?.failedAt.toISOString()).toBe(updatePayload.failedAt); // Compare as ISO strings
      expect(updated?.retryCount).toBe(updatePayload.retryCount);
      expect(updated?.reason).toBe(updatePayload.reason);
    });
  });
});
