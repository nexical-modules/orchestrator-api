import type { ApiClient } from '@tests/integration/lib/client';
import { Factory } from '@tests/integration/lib/factory';
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

    // Verify agent exists to avoid Prisma connect errors
    const check = await Factory.prisma.agent.findUnique({ where: { id: actor.id } });
    if (!check) {
      throw new Error(
        `[Actor] Agent ${actor.id} was "created" but not found in DB before APK creation.`,
      );
    }

    await Factory.create('agentApiKey', {
      agentId: actor.id,
      agent: undefined,
      name: 'Test Token',
      hashedKey: dbKey,
      prefix: 'sk_agent_',
    });

    client.useToken(rawKey);

    return { ...actor, token: { rawKey } };
  },
};
