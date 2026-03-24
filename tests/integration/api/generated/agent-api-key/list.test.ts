// GENERATED CODE - DO NOT MODIFY
import { ApiClient } from '@tests/integration/lib/client';
import { Factory } from '@tests/integration/lib/factory';
import { TestServer } from '@tests/integration/lib/server';
import { beforeEach, describe, expect, it } from 'vitest';
describe('AgentApiKey API - List', () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // GET /api/agent-api-key
  describe('GET /api/agent-api-key', () => {
    const baseData = { name: 'name_test', hashedKey: 'hashedKey_test', prefix: 'prefix_test' };

    it('should allow AGENT_ADMIN to list agentApiKeys', async () => {
      const _actor = await client.as('user', { role: 'USER_ADMIN' });

      // Cleanup first to ensure clean state
      await Factory.prisma.agentApiKey.deleteMany();

      // Seed data
      const _listSuffix = Date.now();
      await Factory.create('agentApiKey', { ...baseData, hashedKey: 'list_1_' + _listSuffix + '' });
      await Factory.create('agentApiKey', { ...baseData, hashedKey: 'list_2_' + _listSuffix + '' });

      const res = await client.get('/api/agent-api-key');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(2);
      expect(res.body.meta).toBeDefined();
    });

    it('should verify pagination metadata', async () => {
      const _actor = await client.as('user', { role: 'USER_ADMIN' });

      // Cleanup and seed specific count
      await Factory.prisma.agentApiKey.deleteMany();

      const _suffix = Date.now();
      const createdIds: string[] = [];
      const totalTarget = 15;

      // Check current count

      const _listSuffix = Date.now();
      const currentCount = 0;
      const toCreate = totalTarget - currentCount;

      for (let i = 0; i < toCreate; i++) {
        const rec = await Factory.create('agentApiKey', {
          ...baseData,
          hashedKey: `page_${i}_${_listSuffix}`,
        });
        createdIds.push(rec.id);
      }

      // Page 1
      const res1 = await client.get('/api/agent-api-key?take=5&skip=0');
      expect(res1.status).toBe(200);
      expect(res1.body.data.length).toBe(5);
      expect(res1.body.meta.total).toBe(15);

      // Page 2
      const res2 = await client.get('/api/agent-api-key?take=5&skip=5');
      expect(res2.status).toBe(200);
      expect(res2.body.data.length).toBe(5);
      expect(res2.body.data[0].id).not.toBe(res1.body.data[0].id);
    });

    it('should filter by name', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));

      const _actor = await client.as('user', { role: 'USER_ADMIN' });

      const val1 = 'name_' + Date.now() + '_A';
      const val2 = 'name_' + Date.now() + '_B';

      const data1 = { ...baseData, name: val1, hashedKey: 'filter_a_' + Date.now() + '' };
      const data2 = { ...baseData, name: val2, hashedKey: 'filter_b_' + Date.now() + '' };

      await Factory.create('agentApiKey', { ...data1 });
      await Factory.create('agentApiKey', { ...data2 });

      const res = await client.get('/api/agent-api-key?name=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].name).toBe(val1);
    });

    it('should filter by hashedKey', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));

      const _actor = await client.as('user', { role: 'USER_ADMIN' });

      const val1 = 'hashedKey_' + Date.now() + '_A';
      const val2 = 'hashedKey_' + Date.now() + '_B';

      const data1 = { ...baseData, hashedKey: val1 };
      const data2 = { ...baseData, hashedKey: val2 };

      await Factory.create('agentApiKey', { ...data1 });
      await Factory.create('agentApiKey', { ...data2 });

      const res = await client.get('/api/agent-api-key?hashedKey=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].hashedKey).toBe(val1);
    });

    it('should filter by prefix', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));

      const _actor = await client.as('user', { role: 'USER_ADMIN' });

      const val1 = 'prefix_' + Date.now() + '_A';
      const val2 = 'prefix_' + Date.now() + '_B';

      const data1 = { ...baseData, prefix: val1, hashedKey: 'filter_a_' + Date.now() + '' };
      const data2 = { ...baseData, prefix: val2, hashedKey: 'filter_b_' + Date.now() + '' };

      await Factory.create('agentApiKey', { ...data1 });
      await Factory.create('agentApiKey', { ...data2 });

      const res = await client.get('/api/agent-api-key?prefix=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].prefix).toBe(val1);
    });

    it('should filter by lastUsedAt', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));

      const _actor = await client.as('user', { role: 'USER_ADMIN' });

      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();

      const data1 = { ...baseData, lastUsedAt: val1, hashedKey: 'filter_a_' + Date.now() + '' };
      const data2 = { ...baseData, lastUsedAt: val2, hashedKey: 'filter_b_' + Date.now() + '' };

      await Factory.create('agentApiKey', { ...data1 });
      await Factory.create('agentApiKey', { ...data2 });

      const res = await client.get('/api/agent-api-key?lastUsedAt=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].lastUsedAt).toBe(val1);
    });

    it('should filter by expiresAt', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));

      const _actor = await client.as('user', { role: 'USER_ADMIN' });

      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();

      const data1 = { ...baseData, expiresAt: val1, hashedKey: 'filter_a_' + Date.now() + '' };
      const data2 = { ...baseData, expiresAt: val2, hashedKey: 'filter_b_' + Date.now() + '' };

      await Factory.create('agentApiKey', { ...data1 });
      await Factory.create('agentApiKey', { ...data2 });

      const res = await client.get('/api/agent-api-key?expiresAt=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].expiresAt).toBe(val1);
    });
  });
});
