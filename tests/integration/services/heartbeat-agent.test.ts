// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { beforeAll, describe, expect, it } from 'vitest';
import { HeartbeatAgentAction } from '../../../src/actions/heartbeat-agent';
import { init } from '../../../src/server-init';

describe('HeartbeatAgentAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should update the last heartbeat of an agent', async () => {
    const agent = await Factory.create('agent', {
      lastHeartbeat: new Date(Date.now() - 10000),
    });
    const ctx = await createMockContext('USER_ADMIN', 'user');

    const result = await HeartbeatAgentAction.run({ id: agent.id }, ctx);

    expect(result.success).toBe(true);

    const updatedAgent = await Factory.prisma.agent.findUnique({ where: { id: agent.id } });
    expect(updatedAgent?.lastHeartbeat.getTime()).toBeGreaterThan(agent.lastHeartbeat.getTime());
  });
});
