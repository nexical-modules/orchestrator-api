// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { beforeAll, describe, expect, it } from 'vitest';
import { FailJobAction } from '../../../src/actions/fail-job';
import { init } from '../../../src/server-init';

describe('FailJobAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should allow an admin to fail any job', async () => {
    const job = await Factory.create('job', { status: 'RUNNING' });
    const ctx = await createMockContext('USER_ADMIN', 'user');

    const result = await FailJobAction.run(
      {
        id: job.id,
        error: { message: 'Something went wrong' },
      },
      ctx,
    );

    expect(result.success).toBe(true);
    expect(result.data?.status).toBe('FAILED');
    expect(result.data?.error).toEqual({ message: 'Something went wrong' });
  });

  it('should allow a job owner to fail their own job', async () => {
    const userCtx = await createMockContext('USER_EMPLOYEE', 'user');
    const user = userCtx.locals.actor as any;

    const job = await Factory.create('job', {
      status: 'RUNNING',
      actorId: user.id,
    });

    const result = await FailJobAction.run(
      {
        id: job.id,
        error: { message: 'Job failed' },
      },
      userCtx,
    );

    expect(result.success).toBe(true);
    expect(result.data?.status).toBe('FAILED');
  });
});
