import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AgentJobOwnerRole } from '../../../src/roles/agent_job_owner';
import { AgentAdminRole } from '../../../src/roles/agent_admin';
import { createMockAstroContext } from '@tests/unit/helpers';

// Mock DB for dynamic imports
const { mockDb } = await vi.hoisted(async () => {
  return {
    mockDb: {
      job: {
        findUnique: vi.fn(),
      },
      jobLog: {
        findUnique: vi.fn(),
      },
    },
  };
});

vi.mock('@/lib/core/db', () => ({
  db: mockDb,
}));

describe('Security Roles', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('AgentAdminRole', () => {
    const policy = new AgentAdminRole();

    it('should allow AGENT_ADMIN', async () => {
      const mockContext = createMockAstroContext({
        locals: { actor: { role: 'AGENT_ADMIN' } },
      });
      await expect(policy.check(mockContext, {})).resolves.not.toThrow();
    });

    it('should throw if no actor', async () => {
      const mockContext = createMockAstroContext({ locals: {} });
      await expect(policy.check(mockContext, {})).rejects.toThrow('Unauthorized: No actor found');
    });
  });

  describe('AgentJobOwnerRole', () => {
    const policy = new AgentJobOwnerRole();

    it('should throw if no actor', async () => {
      const mockContext = createMockAstroContext({ locals: {} });
      await expect(policy.check(mockContext, {})).rejects.toThrow('Unauthorized: No actor found');
    });

    it('should allow AGENT_ADMIN', async () => {
      const mockContext = createMockAstroContext({ locals: { actor: { role: 'AGENT_ADMIN' } } });
      await expect(policy.check(mockContext, {})).resolves.not.toThrow();
    });

    it('should allow if input owner matches', async () => {
      const mockContext = createMockAstroContext({
        locals: { actor: { id: 'u1', role: 'AGENT_JOB_OWNER' } },
      });
      await expect(policy.check(mockContext, { actorId: 'u1' })).resolves.not.toThrow();
    });

    it('should throw if actorId mismatch in input', async () => {
      const mockContext = createMockAstroContext({
        locals: { actor: { id: 'u1', role: 'AGENT_JOB_OWNER' } },
      });
      await expect(policy.check(mockContext, { actorId: 'u2' })).rejects.toThrow(
        'Forbidden: Cannot act on behalf of another actor',
      );
    });

    describe('Resource Level Checks', () => {
      it('should allow if data owner matches', async () => {
        const mockContext = createMockAstroContext({
          locals: { actor: { id: 'u1', role: 'AGENT_JOB_OWNER' } },
        });
        await expect(policy.check(mockContext, {}, { actorId: 'u1' })).resolves.not.toThrow();
      });

      it('should check DB for jobId if data owner mismatch', async () => {
        const mockContext = createMockAstroContext({
          locals: { actor: { id: 'u1', role: 'AGENT_JOB_OWNER' } },
        });
        mockDb.job.findUnique.mockResolvedValue({ actorId: 'u1' });

        await expect(policy.check(mockContext, {}, { jobId: 'j1' })).resolves.not.toThrow();
        expect(mockDb.job.findUnique).toHaveBeenCalled();
      });

      it('should check DB for JobLog if data id present', async () => {
        const mockContext = createMockAstroContext({
          locals: { actor: { id: 'u1', role: 'AGENT_JOB_OWNER' } },
          url: 'http://localhost/api/job-log/l1',
        });
        mockDb.jobLog.findUnique.mockResolvedValue({ job: { actorId: 'u1' } });

        await expect(policy.check(mockContext, {}, { id: 'l1' })).resolves.not.toThrow();
        expect(mockDb.jobLog.findUnique).toHaveBeenCalled();
      });

      it('should check DB for Job if data id present', async () => {
        const mockContext = createMockAstroContext({
          locals: { actor: { id: 'u1', role: 'AGENT_JOB_OWNER' } },
          url: 'http://localhost/api/job/j1',
        });
        mockDb.job.findUnique.mockResolvedValue({ actorId: 'u1' });

        await expect(policy.check(mockContext, {}, { id: 'j1' })).resolves.not.toThrow();
        expect(mockDb.job.findUnique).toHaveBeenCalled();
      });
    });
  });
});
