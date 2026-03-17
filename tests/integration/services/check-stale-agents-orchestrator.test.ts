import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll } from 'vitest';
import { CheckStaleAgentsOrchestratorAction } from '../../../src/actions/check-stale-agents-orchestrator';
import { init } from '../../../src/server-init';

describe('CheckStaleAgentsOrchestratorAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should mark stale agents as OFFLINE', async () => {
    const staleAgent = await Factory.create('agent', {
      lastHeartbeat: new Date(Date.now() - 3600000), // 1 hour ago
      status: 'ONLINE',
    });
    const ctx = await createMockContext('USER_ADMIN', 'user');

    const result = await CheckStaleAgentsOrchestratorAction.run(undefined, ctx);

    expect(result.success).toBe(true);

    const updatedAgent = await Factory.prisma.agent.findUnique({ where: { id: staleAgent.id } });
    expect(updatedAgent?.status).toBe('OFFLINE');
  });
});
