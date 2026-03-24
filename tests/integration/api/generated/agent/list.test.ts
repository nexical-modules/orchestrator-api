// GENERATED CODE - DO NOT MODIFY
import { ApiClient } from '@tests/integration/lib/client';
import { Factory } from '@tests/integration/lib/factory';
import { TestServer } from '@tests/integration/lib/server';
import { beforeEach, describe, expect, it } from 'vitest';
describe('Agent API - List', () => {
  let client: ApiClient;

  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });

  // GET /api/agent
  describe('GET /api/agent', () => {
    const baseData = {
      hostname: 'hostname_test',
      capabilities: ['capabilities_test'],
      lastHeartbeat: new Date().toISOString(),
    };

    it('should allow AGENT_ADMIN to list agents', async () => {
      const _actor = await client.as('user', { role: 'USER_ADMIN' });

      // Cleanup first to ensure clean state
      await Factory.prisma.agent.deleteMany();

      // Seed data
      const _listSuffix = Date.now();
      await Factory.create('agent', { ...baseData });
      await Factory.create('agent', { ...baseData });

      const res = await client.get('/api/agent');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(2);
      expect(res.body.meta).toBeDefined();
    });

    it('should verify pagination metadata', async () => {
      const _actor = await client.as('user', { role: 'USER_ADMIN' });

      // Cleanup and seed specific count
      await Factory.prisma.agent.deleteMany();

      const _suffix = Date.now();
      const createdIds: string[] = [];
      const totalTarget = 15;

      // Check current count

      const _listSuffix = Date.now();
      const currentCount = 0;
      const toCreate = totalTarget - currentCount;

      for (let i = 0; i < toCreate; i++) {
        const rec = await Factory.create('agent', { ...baseData });
        createdIds.push(rec.id);
      }

      // Page 1
      const res1 = await client.get('/api/agent?take=5&skip=0');
      expect(res1.status).toBe(200);
      expect(res1.body.data.length).toBe(5);
      expect(res1.body.meta.total).toBe(15);

      // Page 2
      const res2 = await client.get('/api/agent?take=5&skip=5');
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

      const data1 = { ...baseData, name: val1 };
      const data2 = { ...baseData, name: val2 };

      await Factory.create('agent', { ...data1 });
      await Factory.create('agent', { ...data2 });

      const res = await client.get('/api/agent?name=' + val1);
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

      await Factory.create('agent', { ...data1 });
      await Factory.create('agent', { ...data2 });

      const res = await client.get('/api/agent?hashedKey=' + val1);
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

      const data1 = { ...baseData, prefix: val1 };
      const data2 = { ...baseData, prefix: val2 };

      await Factory.create('agent', { ...data1 });
      await Factory.create('agent', { ...data2 });

      const res = await client.get('/api/agent?prefix=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].prefix).toBe(val1);
    });

    it('should filter by hostname', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));

      const _actor = await client.as('user', { role: 'USER_ADMIN' });

      const val1 = 'hostname_' + Date.now() + '_A';
      const val2 = 'hostname_' + Date.now() + '_B';

      const data1 = { ...baseData, hostname: val1 };
      const data2 = { ...baseData, hostname: val2 };

      await Factory.create('agent', { ...data1 });
      await Factory.create('agent', { ...data2 });

      const res = await client.get('/api/agent?hostname=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].hostname).toBe(val1);
    });

    it('should filter by lastHeartbeat', async () => {
      // Wait to avoid collisions
      await new Promise((r) => setTimeout(r, 10));

      const _actor = await client.as('user', { role: 'USER_ADMIN' });

      const val1 = new Date(Date.now() - 100000).toISOString();
      const val2 = new Date(Date.now() + 100000).toISOString();

      const data1 = { ...baseData, lastHeartbeat: val1 };
      const data2 = { ...baseData, lastHeartbeat: val2 };

      await Factory.create('agent', { ...data1 });
      await Factory.create('agent', { ...data2 });

      const res = await client.get('/api/agent?lastHeartbeat=' + val1);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].lastHeartbeat).toBe(val1);
    });
  });
});
