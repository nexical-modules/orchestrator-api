// GENERATED CODE - DO NOT MODIFY
import { ApiClient } from '@tests/integration/lib/client';
import { Factory } from '@tests/integration/lib/factory';
import { TestServer } from '@tests/integration/lib/server';
import { beforeEach, describe, expect, it } from 'vitest';
describe('JobLog API - Delete', () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // DELETE /api/job-log/[id]
  describe('DELETE /api/job-log/[id]', () => {
    it('should delete jobLog', async () => {
      const actor = await client.as('user', { role: 'USER_EMPLOYEE' });

      const job_0 = await Factory.create('job', {
        actorId: typeof actor !== 'undefined' ? actor.id : undefined,
        actorType: 'user',
      });
      const target = await Factory.create('jobLog', {
        ...{ level: 'level_test', message: 'message_test', timestamp: new Date().toISOString() },
        job: { connect: { id: job_0.id } },
      });

      const res = await client.delete(`/api/job-log/${target.id}`);

      expect(res.status).toBe(200);

      const check = await Factory.prisma.jobLog.findUnique({ where: { id: target.id } });
      expect(check).toBeNull();
    });
  });
});
