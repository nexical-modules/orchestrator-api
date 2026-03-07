// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { describe, it, expect } from 'vitest';
import { PollJobsOrchestratorAction } from '../../../src/actions/poll-jobs-orchestrator';
import type { PollJobsDTO } from '../../../src/sdk';
import { createMockContext } from '../../../../../tests/integration/helpers/context';

describe('PollJobsOrchestratorAction - Service Integration', () => {
  beforeAll(async () => {
    await initOrchestrator();
  });

  it('should pick up a pending job with matching capabilities', async () => {
    // 1. Setup: A pending job of type 'test-task'
    await Factory.prisma.job.deleteMany();
    await Factory.create('job', {
      type: 'test-task',
      status: 'PENDING',
    });

    // 2. Prepare Action Input
    const input = {
      agentId: 'agent-1',
      capabilities: ['test-task', 'other-task'],
    };

    // 3. Invoke Action
    const ctx = await createMockContext('USER_ADMIN', 'agent', 'agent-1');
    const result = await PollJobsOrchestratorAction.run(input, ctx);

    // 4. Verify output
    expect(result.success).toBe(true);
    expect(result.data?.[0]?.type).toBe('test-task');
    expect(result.data?.[0]?.status).toBe('RUNNING');

    // 5. Verify DB state
    const job = await Factory.prisma.job.findUnique({ where: { id: result.data?.[0]?.id } });
    expect(job?.status).toBe('RUNNING');
    expect(job?.lockedBy).toBe('agent-1');
  });

  it('should return null if no matching job is found', async () => {
    const input = {
      agentId: 'agent-1',
      capabilities: ['non-existent-capability'],
    };
    const ctx = await createMockContext();
    const result = await PollJobsOrchestratorAction.run(input, ctx);

    expect(result.success).toBe(true);
    expect(result.data).toStrictEqual([]);
  });
});
describe('PollJobsOrchestratorAction - Service Integration', () => {
  it.skip('should execute successfully', async () => {
    // 1. Setup prerequisite state using DataFactory
    // const prerequisite = await Factory.create('someModel', { ... });

    // 2. Prepare Action Input
    const input: PollJobsDTO = {} as unknown as PollJobsDTO; // TODO: Provide valid mock data

    // 3. Invoke Action directly (bypassing API Client)
    // Note: For service level tests, context is typically mocked or omitted if the action doesn't strictly depend on it.
    const ctx = {} as unknown as APIContext;
    const result = await PollJobsOrchestratorAction.run(input, ctx);

    // 4. Verify Database state explicitly using Prisma
    // const record = await Factory.prisma.someModel.findUnique({ where: { id: ... } });
    // expect(record).toBeDefined();

    // 5. Verify the Action's direct output
    expect(result.success).toBe(true);
  });
});
describe('PollJobsOrchestratorAction - Service Integration', () => {
  it.skip('should execute successfully', async () => {
    // 1. Setup prerequisite state using DataFactory
    // const prerequisite = await Factory.create('someModel', { ... });

    // 2. Prepare Action Input
    const input: PollJobsDTO = {} as unknown as PollJobsDTO; // TODO: Provide valid mock data

    // 3. Prepare Mock Context with Actor
    const ctx = await createMockContext();
    const result = await PollJobsOrchestratorAction.run(input, ctx);

    // 4. Verify Database state explicitly using Prisma
    // const record = await Factory.prisma.someModel.findUnique({ where: { id: ... } });
    // expect(record).toBeDefined();

    // 5. Verify the Action's direct output
    expect(result.success).toBe(true);
  });
});
