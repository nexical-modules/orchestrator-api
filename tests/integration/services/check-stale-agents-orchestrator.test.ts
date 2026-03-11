// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { describe, expect, it } from 'vitest';
import { createMockContext } from '../../../../../tests/integration/helpers/context';
import { CheckStaleAgentsOrchestratorAction } from '../../../src/actions/check-stale-agents-orchestrator';

describe('CheckStaleAgentsOrchestratorAction - Service Integration', () => {
  it('should mark stale agents as offline and release their jobs', async () => {
    // 1. Setup:
    // - Agent 1: Stale (last heartbeat 2 mins ago)
    // - Agent 2: Active (last heartbeat 5 secs ago)
    const staleTime = new Date(Date.now() - 120000);
    const activeTime = new Date(Date.now() - 5000);

    const staleAgent = await Factory.create('agent', {
      status: 'ONLINE',
      lastHeartbeat: staleTime,
    });
    const activeAgent = await Factory.create('agent', {
      status: 'ONLINE',
      lastHeartbeat: activeTime,
    });

    // - Job 1: Locked by stale agent
    // - Job 2: Locked by active agent
    const job1 = await Factory.create('job', { status: 'RUNNING', lockedBy: staleAgent.id });
    const job2 = await Factory.create('job', { status: 'RUNNING', lockedBy: activeAgent.id });

    // 2. Invoke Action (default timeout 60s)
    const ctx = { locals: {} } as unknown as APIContext;
    const result = await CheckStaleAgentsOrchestratorAction.run(undefined as unknown as void, ctx);

    // 3. Verify output
    expect(result.success).toBe(true);
    const data = result.data as unknown as { offlineAgents: number; releasedJobs: number };
    expect(data?.offlineAgents).toBe(1);
    expect(data?.releasedJobs).toBe(1);

    // 4. Verify DB state
    const staleAgentDb = await Factory.prisma.agent.findUnique({ where: { id: staleAgent.id } });
    expect(staleAgentDb?.status).toBe('OFFLINE');

    const activeAgentDb = await Factory.prisma.agent.findUnique({ where: { id: activeAgent.id } });
    expect(activeAgentDb?.status).toBe('ONLINE');

    const job1Db = await Factory.prisma.job.findUnique({ where: { id: job1.id } });
    expect(job1Db?.status).toBe('PENDING'); // Released
    expect(job1Db?.lockedBy).toBeNull();

    const job2Db = await Factory.prisma.job.findUnique({ where: { id: job2.id } });
    expect(job2Db?.status).toBe('RUNNING'); // Stayed running
    expect(job2Db?.lockedBy).toBe(activeAgent.id);
  });
});
describe('CheckStaleAgentsOrchestratorAction - Service Integration', () => {
  it.skip('should execute successfully', async () => {
    // 1. Setup prerequisite state using DataFactory
    // const prerequisite = await Factory.create('someModel', { ... });

    // 2. Prepare Action Input

    // 3. Invoke Action directly (bypassing API Client)
    // Note: For service level tests, context is typically mocked or omitted if the action doesn't strictly depend on it.
    const ctx = {} as unknown as APIContext;
    const result = await CheckStaleAgentsOrchestratorAction.run(undefined, ctx);

    // 4. Verify Database state explicitly using Prisma
    // const record = await Factory.prisma.someModel.findUnique({ where: { id: ... } });
    // expect(record).toBeDefined();

    // 5. Verify the Action's direct output
    expect(result.success).toBe(true);
  });
});
describe('CheckStaleAgentsOrchestratorAction - Service Integration', () => {
  it.skip('should execute successfully', async () => {
    // 1. Setup prerequisite state using DataFactory
    // const prerequisite = await Factory.create('someModel', { ... });

    // 2. Prepare Action Input

    // 3. Prepare Mock Context with Actor
    const ctx = await createMockContext();
    const result = await CheckStaleAgentsOrchestratorAction.run(undefined, ctx);

    // 4. Verify Database state explicitly using Prisma
    // const record = await Factory.prisma.someModel.findUnique({ where: { id: ... } });
    // expect(record).toBeDefined();

    // 5. Verify the Action's direct output
    expect(result.success).toBe(true);
  });
});
