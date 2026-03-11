// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { describe, expect, it } from 'vitest';
import { createMockContext } from '../../../../../tests/integration/helpers/context';
import { DeleteAgentApiKeyAction } from '../../../src/actions/delete-agent-api-key';

describe('DeleteAgentApiKeyAction - Service Integration', () => {
  beforeAll(async () => {
    await initOrchestrator();
  });

  it('should delete an agent API key', async () => {
    const key = await Factory.create('agentApiKey');

    const input = { id: key.id };
    const ctx = await createMockContext('AGENT_ADMIN');
    const result = await DeleteAgentApiKeyAction.run(input, ctx);

    expect(result.success).toBe(true);

    const deleted = await Factory.prisma.agentApiKey.findUnique({ where: { id: key.id } });
    expect(deleted).toBeNull();
  });
});
