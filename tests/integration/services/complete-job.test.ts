import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll } from 'vitest';
import { CompleteJobAction } from '../../../src/actions/complete-job';
import { init } from '../../../src/server-init';

describe('CompleteJobAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should allow an admin to complete any job', async () => {
    const job = await Factory.create('job', { status: 'RUNNING' });
    const ctx = await createMockContext('USER_ADMIN', 'user');

    const result = await CompleteJobAction.run(
      {
        id: job.id,
        result: { data: 'success' },
      },
      ctx,
    );

    expect(result.success).toBe(true);
    expect(result.data?.status).toBe('COMPLETED');
    expect(result.data?.result).toEqual({ data: 'success' });
  });

  it('should allow a job owner to complete their own job', async () => {
    const userCtx = await createMockContext('USER_EMPLOYEE', 'user');
    const user = userCtx.locals.actor as any;

    const job = await Factory.create('job', {
      status: 'RUNNING',
      actorId: user.id,
    });

    const result = await CompleteJobAction.run(
      {
        id: job.id,
        result: { ok: true },
      },
      userCtx,
    );

    expect(result.success).toBe(true);
    expect(result.data?.status).toBe('COMPLETED');
  });
});
