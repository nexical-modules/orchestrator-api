// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { describe, expect, it } from 'vitest';
import { createMockContext } from '../../../../../tests/integration/helpers/context';
import { CompleteJobAction } from '../../../src/actions/complete-job';
import type { CompleteJobDTO } from '../../../src/sdk';

describe('CompleteJobAction - Service Integration', () => {
  beforeAll(async () => {
    await initOrchestrator();
  });

  it('should complete a running job', async () => {
    // 1. Setup prerequisite state: a RUNNING job
    const job = await Factory.create('job', {
      status: 'RUNNING',
    });

    // 2. Prepare Action Input
    const input = {
      id: job.id,
      result: { output: 'success data' },
    };

    // 3. Invoke Action directly
    const ctx = await createMockContext();
    const result = await CompleteJobAction.run(input, ctx);

    // 4. Verify the Action's direct output
    expect(result.success).toBe(true);
    expect(result.data?.status).toBe('COMPLETED');
    expect(result.data?.progress).toBe(100);

    // 5. Verify Database state explicitly using Prisma
    const updated = await Factory.prisma.job.findUnique({ where: { id: job.id } });
    expect(updated?.status).toBe('COMPLETED');
    expect(updated?.progress).toBe(100);
    expect(updated?.result).toStrictEqual({ output: 'success data' });
  });

  it('should fail if job is not found', async () => {
    const input = { id: 'cmmcqhoey0001v21d8lgy4qvl', result: { foo: 'bar' } };
    const ctx = await createMockContext();
    const result = await CompleteJobAction.run(input, ctx);

    expect(result.success).toBe(false);
    expect(result.error).toBe('orchestrator.service.error.not_found');
  });
});
describe('CompleteJobAction - Service Integration', () => {
  it.skip('should execute successfully', async () => {
    // 1. Setup prerequisite state using DataFactory
    // const prerequisite = await Factory.create('someModel', { ... });

    // 2. Prepare Action Input
    const input: CompleteJobDTO = {} as unknown as CompleteJobDTO; // TODO: Provide valid mock data

    // 3. Invoke Action directly (bypassing API Client)
    // Note: For service level tests, context is typically mocked or omitted if the action doesn't strictly depend on it.
    const ctx = {} as unknown as APIContext;
    const result = await CompleteJobAction.run(input, ctx);

    // 4. Verify Database state explicitly using Prisma
    // const record = await Factory.prisma.someModel.findUnique({ where: { id: ... } });
    // expect(record).toBeDefined();

    // 5. Verify the Action's direct output
    expect(result.success).toBe(true);
  });
});
describe('CompleteJobAction - Service Integration', () => {
  it.skip('should execute successfully', async () => {
    // 1. Setup prerequisite state using DataFactory
    // const prerequisite = await Factory.create('someModel', { ... });

    // 2. Prepare Action Input
    const input: CompleteJobDTO = {} as unknown as CompleteJobDTO; // TODO: Provide valid mock data

    // 3. Prepare Mock Context with Actor
    const ctx = await createMockContext();
    const result = await CompleteJobAction.run(input, ctx);

    // 4. Verify Database state explicitly using Prisma
    // const record = await Factory.prisma.someModel.findUnique({ where: { id: ... } });
    // expect(record).toBeDefined();

    // 5. Verify the Action's direct output
    expect(result.success).toBe(true);
  });
});
