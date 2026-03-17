import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll } from 'vitest';
import { GetJobMetricsAction } from '../../../src/actions/get-job-metrics';
import { init } from '../../../src/server-init';

describe('GetJobMetricsAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should return job metrics successfully', async () => {
    await Factory.create('job', { status: 'PENDING' });
    await Factory.create('job', { status: 'COMPLETED' });
    const ctx = await createMockContext('USER_ADMIN', 'user');

    const result = await GetJobMetricsAction.run(undefined, ctx);

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(typeof result.data?.total).toBe('number');
    expect(typeof result.data?.pending).toBe('number');
    expect(typeof result.data?.completed).toBe('number');
  });
});
