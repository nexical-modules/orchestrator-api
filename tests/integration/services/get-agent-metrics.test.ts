import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll } from 'vitest';
import { GetAgentMetricsAction } from '../../../src/actions/get-agent-metrics';
import { init } from '../../../src/server-init';

describe('GetAgentMetricsAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should return agent metrics successfully', async () => {
    await Factory.create('agent', { status: 'ONLINE' });
    await Factory.create('agent', { status: 'OFFLINE' });
    const ctx = await createMockContext('USER_ADMIN', 'user');

    const result = await GetAgentMetricsAction.run(undefined, ctx);

    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(typeof result.data?.total).toBe('number');
    expect(typeof result.data?.online).toBe('number');
    expect(typeof result.data?.offline).toBe('number');
  });
});
