import { Factory } from '@tests/integration/lib/factory';
import type { ApiClient } from '@tests/integration/lib/client';
import crypto from 'node:crypto';

export const actors = {
  agent: async (client: ApiClient, params: Record<string, unknown> = {}) => {
    let actor;
    if (params.id) {
      actor = await Factory.prisma.agent.findUnique({ where: { id: params.id } });
    } else if (params.email) {
      actor = await Factory.prisma.agent.findFirst({ where: { email: params.email } });
    }

    if (!actor) {
      const factoryParams = { ...params };
      if (factoryParams.strategy) delete factoryParams.strategy;
      actor = await Factory.create('agent', factoryParams);
    }

    const rawKey = `sk_agent_${crypto.randomUUID().replace(/-/g, '')}`;
    let dbKey = rawKey;

    dbKey = crypto.createHash('sha256').update(rawKey).digest('hex');

    await Factory.create('agentApiKey', {
      agent: { connect: { id: actor.id } },
      name: 'Test Token',
      hashedKey: dbKey,
      prefix: 'sk_agent_',
    });

    client.useToken(rawKey);

    return actor;
  },
};
