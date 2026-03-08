// GENERATED CODE - DO NOT MODIFY
import { describe, it, expect, beforeEach } from 'vitest';
import { ApiClient } from '@tests/integration/lib/client';
import { TestServer } from '@tests/integration/lib/server';
import { Factory } from '@tests/integration/lib/factory';
describe('AgentApiKey API - Get', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/agent-api-key/[id]
  describe('GET /api/agent-api-key/[id]', () => {
    it('should retrieve a specific agentApiKey', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const agent_0 = await Factory.create('agent', {});
      const target = await Factory.create('agentApiKey', {
        ...{ name: 'name_test', hashedKey: 'hashedKey_test', prefix: 'prefix_test' },
        agent: { connect: { id: agent_0.id } },
      });
      const res = await client.get(`/api/agent-api-key/${target.id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(target.id);
    });
    it('should return 404 for missing id', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const res = await client.get('/api/agent-api-key/missing-id-123');
      expect(res.status).toBe(404);
    });
  });
});
describe('AgentApiKey API - Get', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/agent-api-key/[id]
  describe('GET /api/agent-api-key/[id]', () => {
    it('should retrieve a specific agentApiKey', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const agent_0 = await Factory.create('agent', {});
      const target = await Factory.create('agentApiKey', {
        ...{ name: 'name_test', hashedKey: 'hashedKey_test', prefix: 'prefix_test' },
        agent: { connect: { id: agent_0.id } },
      });
      const res = await client.get(`/api/agent-api-key/${target.id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(target.id);
    });
    it('should return 404 for missing id', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const res = await client.get('/api/agent-api-key/missing-id-123');
      expect(res.status).toBe(404);
    });
  });
});
describe('AgentApiKey API - Get', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/agent-api-key/[id]
  describe('GET /api/agent-api-key/[id]', () => {
    it('should retrieve a specific agentApiKey', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const agent_0 = await Factory.create('agent', {});
      const target = await Factory.create('agentApiKey', {
        ...{ name: 'name_test', hashedKey: 'hashedKey_test', prefix: 'prefix_test' },
        agent: { connect: { id: agent_0.id } },
      });
      const res = await client.get(`/api/agent-api-key/${target.id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(target.id);
    });
    it('should return 404 for missing id', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const res = await client.get('/api/agent-api-key/missing-id-123');
      expect(res.status).toBe(404);
    });
  });
});
describe('AgentApiKey API - Get', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/agent-api-key/[id]
  describe('GET /api/agent-api-key/[id]', () => {
    it('should retrieve a specific agentApiKey', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const agent_0 = await Factory.create('agent', {});
      const target = await Factory.create('agentApiKey', {
        ...{ name: 'name_test', hashedKey: 'hashedKey_test', prefix: 'prefix_test' },
        agent: { connect: { id: agent_0.id } },
      });
      const res = await client.get(`/api/agent-api-key/${target.id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(target.id);
    });
    it('should return 404 for missing id', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const res = await client.get('/api/agent-api-key/missing-id-123');
      expect(res.status).toBe(404);
    });
  });
});
describe('AgentApiKey API - Get', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/agent-api-key/[id]
  describe('GET /api/agent-api-key/[id]', () => {
    it('should retrieve a specific agentApiKey', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const agent_0 = await Factory.create('agent', {});
      const target = await Factory.create('agentApiKey', {
        ...{ name: 'name_test', hashedKey: 'hashedKey_test', prefix: 'prefix_test' },
        agent: { connect: { id: agent_0.id } },
      });
      const res = await client.get(`/api/agent-api-key/${target.id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(target.id);
    });
    it('should return 404 for missing id', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const res = await client.get('/api/agent-api-key/missing-id-123');
      expect(res.status).toBe(404);
    });
  });
});
describe('AgentApiKey API - Get', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/agent-api-key/[id]
  describe('GET /api/agent-api-key/[id]', () => {
    it('should retrieve a specific agentApiKey', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const agent_0 = await Factory.create('agent', {});
      const target = await Factory.create('agentApiKey', {
        ...{ name: 'name_test', hashedKey: 'hashedKey_test', prefix: 'prefix_test' },
        agent: { connect: { id: agent_0.id } },
      });
      const res = await client.get(`/api/agent-api-key/${target.id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(target.id);
    });
    it('should return 404 for missing id', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const res = await client.get('/api/agent-api-key/missing-id-123');
      expect(res.status).toBe(404);
    });
  });
});
describe('AgentApiKey API - Get', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/agent-api-key/[id]
  describe('GET /api/agent-api-key/[id]', () => {
    it('should retrieve a specific agentApiKey', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const agent_0 = await Factory.create('agent', {});
      const target = await Factory.create('agentApiKey', {
        ...{ name: 'name_test', hashedKey: 'hashedKey_test', prefix: 'prefix_test' },
        agent: { connect: { id: agent_0.id } },
      });
      const res = await client.get(`/api/agent-api-key/${target.id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(target.id);
    });
    it('should return 404 for missing id', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const res = await client.get('/api/agent-api-key/missing-id-123');
      expect(res.status).toBe(404);
    });
  });
});
describe('AgentApiKey API - Get', () => {
  let client: ApiClient;
  beforeEach(async () => {
    client = new ApiClient(TestServer.getUrl());
  });
  // GET /api/agent-api-key/[id]
  describe('GET /api/agent-api-key/[id]', () => {
    it('should retrieve a specific agentApiKey', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const agent_0 = await Factory.create('agent', {});
      const target = await Factory.create('agentApiKey', {
        ...{ name: 'name_test', hashedKey: 'hashedKey_test', prefix: 'prefix_test' },
        agent: { connect: { id: agent_0.id } },
      });
      const res = await client.get(`/api/agent-api-key/${target.id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(target.id);
    });
    it('should return 404 for missing id', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const actor = await client.as('user', { role: 'USER_ADMIN' });
      const res = await client.get('/api/agent-api-key/missing-id-123');
      expect(res.status).toBe(404);
    });
  });
});
