// GENERATED CODE - DO NOT MODIFY
import { ApiClient } from '@tests/integration/lib/client';
import { Factory } from '@tests/integration/lib/factory';
import { TestServer } from '@tests/integration/lib/server';
import { beforeEach, describe, expect, it } from 'vitest';
describe('JobLog API - Update', () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // PUT /api/job-log/[id]
  describe('PUT /api/job-log/[id]', () => {
    it('should update jobLog', async () => {
       
      const actor = await client.as('user', { role: 'USER_EMPLOYEE' });

      const job_0 = await Factory.create('job', {
        actorId: typeof actor !== 'undefined' ? actor.id : undefined,
        actorType: 'user',
      });
      const target = await Factory.create('jobLog', {
        ...{ level: 'level_test', message: 'message_test', timestamp: new Date().toISOString() },
        job: { connect: { id: job_0.id } },
      });
      const updatePayload = {
        ...{
          level: 'level_updated',
          message: 'message_updated',
          timestamp: new Date().toISOString(),
        },
        jobId: job_0.id,
      };

      const res = await client.put(`/api/job-log/${target.id}`, updatePayload);

      expect(res.status).toBe(200);

      const updated = await Factory.prisma.jobLog.findUnique({ where: { id: target.id } });
      expect(updated?.level).toBe(updatePayload.level);
      expect(updated?.message).toBe(updatePayload.message);
      expect(updated?.timestamp.toISOString()).toBe(updatePayload.timestamp); // Compare as ISO strings
    });
  });
});
