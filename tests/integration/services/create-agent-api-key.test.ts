// INITIAL GENERATED CODE - REVIEW AND MODIFY AS NEEDED FOR SERVICE INTEGRATION TESTS
import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { beforeAll, describe, expect, it } from 'vitest';
import { CreateAgentApiKeyAction } from '../../../src/actions/create-agent-api-key';
import { init } from '../../../src/server-init';

describe('CreateAgentApiKeyAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should allow an admin to create an API key for an agent', async () => {
    const agent = await Factory.create('agent');
    const ctx = await createMockContext('USER_ADMIN', 'user');

    const result = await CreateAgentApiKeyAction.run(
      {
        agentId: agent.id,
        name: 'Test Key',
      },
      ctx,
    );

    if (!result.success) {
      console.log('[DEBUG] CreateAgentApiKeyAction error:', result.error);
    }

    expect(result.success).toBe(true);
    expect(result.data?.rawKey).toBeDefined();
    expect(result.data?.token.name).toBe('Test Key');

    const key = await Factory.prisma.agentApiKey.findUnique({
      where: { id: result.data?.token.id },
    });
    expect(key).toBeDefined();
    expect(key?.agentId).toBe(agent.id);
  });
});
