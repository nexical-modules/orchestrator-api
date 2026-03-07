// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { describe, it, expect } from 'vitest';
import { HeartbeatAgentAction } from '../../../src/actions/heartbeat-agent';
import type { HeartbeatDTO } from '../../../src/sdk';
import { createMockContext } from '../../../../../tests/integration/helpers/context';

describe('HeartbeatAgentAction - Service Integration', () => {
  it('should update agent heartbeat', async () => {
    // 1. Setup: Create an agent with an old heartbeat
    const oldDate = new Date(Date.now() - 10000);
    const agent = await Factory.create('agent', {
      lastHeartbeat: oldDate,
      status: 'OFFLINE',
    });

    // 2. Prepare Action Input
    const input = { id: agent.id };

    // 3. Invoke Action
    const ctx = { locals: {} } as unknown as APIContext;
    const result = await HeartbeatAgentAction.run(input, ctx);

    // 4. Verify output
    expect(result.success).toBe(true);

    // 5. Verify DB state
    const updated = await Factory.prisma.agent.findUnique({ where: { id: agent.id } });
    expect(updated?.status).toBe('ONLINE');
    expect(updated?.lastHeartbeat.getTime()).toBeGreaterThan(oldDate.getTime());
  });
});
describe('HeartbeatAgentAction - Service Integration', () => {
  it.skip('should execute successfully', async () => {
    // 1. Setup prerequisite state using DataFactory
    // const prerequisite = await Factory.create('someModel', { ... });

    // 2. Prepare Action Input
    const input: HeartbeatDTO = {} as unknown as HeartbeatDTO; // TODO: Provide valid mock data

    // 3. Invoke Action directly (bypassing API Client)
    // Note: For service level tests, context is typically mocked or omitted if the action doesn't strictly depend on it.
    const ctx = {} as unknown as APIContext;
    const result = await HeartbeatAgentAction.run(input, ctx);

    // 4. Verify Database state explicitly using Prisma
    // const record = await Factory.prisma.someModel.findUnique({ where: { id: ... } });
    // expect(record).toBeDefined();

    // 5. Verify the Action's direct output
    expect(result.success).toBe(true);
  });
});
describe('HeartbeatAgentAction - Service Integration', () => {
  it.skip('should execute successfully', async () => {
    // 1. Setup prerequisite state using DataFactory
    // const prerequisite = await Factory.create('someModel', { ... });

    // 2. Prepare Action Input
    const input: HeartbeatDTO = {} as unknown as HeartbeatDTO; // TODO: Provide valid mock data

    // 3. Prepare Mock Context with Actor
    const ctx = await createMockContext();
    const result = await HeartbeatAgentAction.run(input, ctx);

    // 4. Verify Database state explicitly using Prisma
    // const record = await Factory.prisma.someModel.findUnique({ where: { id: ... } });
    // expect(record).toBeDefined();

    // 5. Verify the Action's direct output
    expect(result.success).toBe(true);
  });
});
