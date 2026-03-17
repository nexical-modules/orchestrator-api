// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { beforeAll, describe, expect, it } from 'vitest';
import { CancelJobAction } from '../../../src/actions/cancel-job';
import { init } from '../../../src/server-init';

describe('CancelJobAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should allow an admin to cancel any job', async () => {
    const job = await Factory.create('job', { status: 'PENDING' });
    const ctx = await createMockContext('USER_ADMIN', 'user');

    const result = await CancelJobAction.run({ id: job.id }, ctx);

    expect(result.success).toBe(true);
    expect(result.data?.status).toBe('CANCELLED');
  });

  it('should allow a job owner to cancel their own job', async () => {
    const userCtx = await createMockContext('USER_EMPLOYEE', 'user');
    const user = userCtx.locals.actor as any;

    const job = await Factory.create('job', {
      status: 'PENDING',
      actorId: user.id,
    });

    const result = await CancelJobAction.run({ id: job.id }, userCtx);

    expect(result.success).toBe(true);
    expect(result.data?.status).toBe('CANCELLED');
  });
});
