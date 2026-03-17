import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll } from 'vitest';
import { UpdateProgressJobAction } from '../../../src/actions/update-progress-job';
import { init } from '../../../src/server-init';

describe('UpdateProgressJobAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should allow an admin to update any job progress', async () => {
    const job = await Factory.create('job', { status: 'RUNNING', progress: 0 });
    const ctx = await createMockContext('USER_ADMIN', 'user');

    const result = await UpdateProgressJobAction.run(
      {
        id: job.id,
        progress: 50,
      },
      ctx,
    );

    expect(result.success).toBe(true);

    const updatedJob = await Factory.prisma.job.findUnique({ where: { id: job.id } });
    expect(updatedJob?.progress).toBe(50);
  });

  it('should allow a job owner to update their own job progress', async () => {
    const userCtx = await createMockContext('USER_EMPLOYEE', 'user');
    const user = userCtx.locals.actor as any;

    const job = await Factory.create('job', {
      status: 'RUNNING',
      actorId: user.id,
      lockedBy: user.id,
      progress: 10,
    });

    const result = await UpdateProgressJobAction.run(
      {
        id: job.id,
        progress: 80,
      },
      userCtx,
    );

    expect(result.success).toBe(true);

    const updatedJob = await Factory.prisma.job.findUnique({ where: { id: job.id } });
    expect(updatedJob?.progress).toBe(80);
  });
});
