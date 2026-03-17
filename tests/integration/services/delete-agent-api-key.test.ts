import { createMockContext } from '@tests/integration/helpers/context';
import { Factory } from '@tests/integration/lib/factory';
import { describe, expect, it, beforeAll } from 'vitest';
import { DeleteAgentApiKeyAction } from '../../../src/actions/delete-agent-api-key';
import { init } from '../../../src/server-init';

describe('DeleteAgentApiKeyAction - Service Integration', () => {
  beforeAll(async () => {
    await init();
  });

  it('should allow an admin to delete an agent API key', async () => {
    const agent = await Factory.create('agent');
    const key = await Factory.create('agentApiKey', { agent: undefined, agentId: agent.id });
    const ctx = await createMockContext('USER_ADMIN', 'user');

    const result = await DeleteAgentApiKeyAction.run({ id: key.id }, ctx);

    expect(result.success).toBe(true);
    expect(result.data?.id).toBe(key.id);

    const deletedKey = await Factory.prisma.agentApiKey.findUnique({ where: { id: key.id } });
    expect(deletedKey).toBeNull();
  });
});
