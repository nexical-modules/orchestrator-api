import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll } from 'vitest';
import { RegisterAgentAction } from '../../../src/actions/register-agent';
import { init } from '../../../src/server-init';

describe('RegisterAgentAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should allow registering a new agent', async () => {
    const ctx = await createMockContext('USER_ADMIN', 'user');

    const result = await RegisterAgentAction.run(
      {
        id: 'test-agent-1',
        name: 'Test Agent',
        hostname: 'test-host',
        capabilities: ['test-cap'],
      },
      ctx,
    );

    expect(result.success).toBe(true);
    expect(result.data?.id).toBe('test-agent-1');
    expect(result.data?.status).toBe('ONLINE');

    const agent = await Factory.prisma.agent.findUnique({ where: { id: 'test-agent-1' } });
    expect(agent).toBeDefined();
    expect(agent?.hostname).toBe('test-host');
  });

  it('should allow upserting an existing agent', async () => {
    await Factory.create('agent', { id: 'existing-agent', hostname: 'old-host' });
    const ctx = await createMockContext('USER_ADMIN', 'user');

    const result = await RegisterAgentAction.run(
      {
        id: 'existing-agent',
        name: 'New Name',
        hostname: 'new-host',
        capabilities: ['new-cap'],
      },
      ctx,
    );

    expect(result.success).toBe(true);
    expect(result.data?.hostname).toBe('new-host');

    const agent = await Factory.prisma.agent.findUnique({ where: { id: 'existing-agent' } });
    expect(agent?.hostname).toBe('new-host');
    expect(agent?.name).toBe('New Name');
  });
});
