// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { describe, it, expect } from 'vitest';
import { GetAgentMetricsAction } from '../../../src/actions/get-agent-metrics';
import { createMockContext } from '../../../../../tests/integration/helpers/context';

describe('GetAgentMetricsAction - Service Integration', () => {
  it('should return correct agent metrics', async () => {
    // 1. Setup: Create multiple agents in different states
    await Factory.prisma.agent.deleteMany(); // Clean start for metrics accuracy

    await Factory.create('agent', { status: 'ONLINE', lastHeartbeat: new Date() });
    await Factory.create('agent', { status: 'ONLINE', lastHeartbeat: new Date() });
    await Factory.create('agent', { status: 'OFFLINE', lastHeartbeat: new Date(0) });
    await Factory.create('agent', { status: 'BUSY', lastHeartbeat: new Date() });

    // 2. Invoke Action
    const ctx = { locals: {} } as unknown as APIContext;
    const result = await GetAgentMetricsAction.run(undefined, ctx);

    // 3. Verify output
    expect(result.success).toBe(true);
    expect(result.data?.total).toBe(4);
    expect(result.data?.online).toBe(2);
    expect(result.data?.offline).toBe(1);
    expect(result.data?.busy).toBe(1);
  });
});
describe('GetAgentMetricsAction - Service Integration', () => {
  it.skip('should execute successfully', async () => {
    // 1. Setup prerequisite state using DataFactory
    // const prerequisite = await Factory.create('someModel', { ... });

    // 2. Prepare Action Input

    // 3. Invoke Action directly (bypassing API Client)
    // Note: For service level tests, context is typically mocked or omitted if the action doesn't strictly depend on it.
    const ctx = {} as unknown as APIContext;
    const result = await GetAgentMetricsAction.run(undefined, ctx);

    // 4. Verify Database state explicitly using Prisma
    // const record = await Factory.prisma.someModel.findUnique({ where: { id: ... } });
    // expect(record).toBeDefined();

    // 5. Verify the Action's direct output
    expect(result.success).toBe(true);
  });
});
describe('GetAgentMetricsAction - Service Integration', () => {
  it.skip('should execute successfully', async () => {
    // 1. Setup prerequisite state using DataFactory
    // const prerequisite = await Factory.create('someModel', { ... });

    // 2. Prepare Action Input

    // 3. Prepare Mock Context with Actor
    const ctx = await createMockContext();
    const result = await GetAgentMetricsAction.run(undefined, ctx);

    // 4. Verify Database state explicitly using Prisma
    // const record = await Factory.prisma.someModel.findUnique({ where: { id: ... } });
    // expect(record).toBeDefined();

    // 5. Verify the Action's direct output
    expect(result.success).toBe(true);
  });
});
