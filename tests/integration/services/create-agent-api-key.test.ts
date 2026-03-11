// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { describe, expect, it } from 'vitest';
import { createMockContext } from '../../../../../tests/integration/helpers/context';
import { CreateAgentApiKeyAction } from '../../../src/actions/create-agent-api-key';

describe('CreateAgentApiKeyAction - Service Integration', () => {
  beforeAll(async () => {
    await initOrchestrator();
  });

  it('should create an API key for an agent', async () => {
    const agent = await Factory.create('agent');

    const input = {
      agentId: agent.id,
      name: 'Test Key',
    };

    const ctx = await createMockContext('AGENT_ADMIN');
    const result = await CreateAgentApiKeyAction.run(input, ctx);

    expect(result.success).toBe(true);
    expect(result.data?.token.name).toBe('Test Key');
    expect(result.data?.rawKey).toBeDefined(); // Plain text key should be returned once

    const keyInDb = await Factory.prisma.agentApiKey.findFirst({ where: { agentId: agent.id } });
    expect(keyInDb).toBeDefined();
    expect(keyInDb?.name).toBe('Test Key');
  });
});
