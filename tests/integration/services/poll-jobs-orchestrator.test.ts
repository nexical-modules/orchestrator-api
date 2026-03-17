import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll } from 'vitest';
import { PollJobsOrchestratorAction } from '../../../src/actions/poll-jobs-orchestrator';
import { init } from '../../../src/server-init';

describe('PollJobsOrchestratorAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should allow an agent to pick up a pending job', async () => {
    const job = await Factory.create('job', {
      status: 'PENDING',
      type: 'test-type',
      nextRetryAt: null,
    });
    const ctx = await createMockContext('AGENT_ADMIN', 'agent'); // Use an agent actor for polling
    const actor = ctx.locals.actor as any;

    const result = await PollJobsOrchestratorAction.run(
      {
        agentId: actor.id,
        capabilities: ['test-type'],
      },
      ctx,
    );

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);
    expect(result.data?.[0].id).toBe(job.id);
    expect(result.data?.[0].status).toBe('RUNNING');
    expect(result.data?.[0].lockedBy).toBe(actor.id);
  });
});
