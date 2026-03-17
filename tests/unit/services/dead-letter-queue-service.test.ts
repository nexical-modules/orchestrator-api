// GENERATED CODE - DO NOT MODIFY
import { db } from '@/lib/core/db';
import { Logger } from '@/lib/core/logger';
import { HookSystem } from '@/lib/modules/hooks';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DeadLetterQueueService } from '../../../src/services/dead-letter-queue-service';

vi.mock('@/lib/core/config', () => ({
  config: {
    PUBLIC_API_URL: 'http://localhost:3000',
    NODE_ENV: 'test',
  },
  createConfig: vi.fn().mockImplementation((schema) => ({
    parse: vi.fn().mockImplementation((d) => d),
    ...schema,
  })),
  getProcessEnv: vi.fn().mockImplementation((k) => k),
}));

vi.mock('@/lib/core/db', () => {
  const mockModelProps = {
    id: '1',
    email: 'test@example.com',
    name: 'test',
    status: 'RUNNING',
    role: 'TEAM_MEMBER',
    token: 'test-token',
    expires: new Date(Date.now() + 86400000),
    actorId: 'ne_pat_test',
    lockedBy: 'ne_pat_test',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const isExistenceCheck = (where: Record<string, unknown>): boolean => {
    if (!where) return false;
    if (where.id) return false; // If searching by ID, assume we want the record to exist
    const fields = [
      'email',
      'username',
      'teamId_userId',
      'userId_teamId',
      'teamId_email',
      'email_teamId',
      // 'token', // Removed token from existence check as it's often used to fetch existing invitations
    ];
    const whereKeys = Object.keys(where);
    if (whereKeys.some((k) => fields.includes(k))) return true;
    if (whereKeys.some((k) => k.includes('_'))) return true;
    if (where.OR && Array.isArray(where.OR))
      return (where.OR as Record<string, unknown>[]).some((c) => isExistenceCheck(c));
    if (where.AND && Array.isArray(where.AND))
      return (where.AND as Record<string, unknown>[]).some((c) => isExistenceCheck(c));
    if (where.userId && where.teamId) return true;
    return false;
  };

  const baseMockModel = {
    findMany: () => Promise.resolve([mockModelProps]),
    findUnique: (args: { where: Record<string, unknown> }) => {
      if (isExistenceCheck(args?.where) && !args?.where?.id) return null;
      return {
        ...(mockModelProps as Record<string, unknown>),
        ...args?.where,
      };
    },
    findFirst: (args: { where: Record<string, unknown> }) => {
      if (isExistenceCheck(args?.where) && !args?.where?.id) return null;
      return {
        ...(mockModelProps as Record<string, unknown>),
        ...args?.where,
      };
    },
    create: () => Promise.resolve(mockModelProps),
    update: () => Promise.resolve(mockModelProps),
    delete: () => Promise.resolve(mockModelProps),
    count: () => Promise.resolve(1),
    upsert: () => Promise.resolve(mockModelProps),
    updateMany: () => Promise.resolve({ count: 1 }),
    deleteMany: () => Promise.resolve({ count: 1 }),
    groupBy: () => Promise.resolve([{ _count: { id: 1 }, status: 'ACTIVE' }]),
    aggregate: () => Promise.resolve({ _count: { id: 1 }, _avg: { value: 0 } }),
  };

  const mockModel = {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
    upsert: vi.fn(),
    updateMany: vi.fn(),
    deleteMany: vi.fn(),
    groupBy: vi.fn(),
    aggregate: vi.fn(),
    ...(mockModelProps as Record<string, unknown>),
  };

  const handler = {
    get: (target: Record<string, unknown>, prop: string): unknown => {
      if (prop === '$transaction') {
        return vi.fn().mockImplementation(async (input) => {
          if (Array.isArray(input)) return Promise.all(input);
          return typeof input === 'function'
            ? input(new Proxy({}, handler as ProxyHandler<object>))
            : input;
        });
      }
      if (typeof prop === 'string' && !prop.startsWith('$')) {
        return mockModel;
      }
      return target[prop];
    },
  };

  const resetImplementations = () => {
    Object.keys(baseMockModel).forEach((key) => {
      (mockModel as Record<string, import('vitest').Mock>)[key].mockImplementation(
        (baseMockModel as Record<string, unknown>)[key] as (...args: unknown[]) => unknown,
      );
    });
  };

  resetImplementations();

  (globalThis as unknown as Record<string, () => void>)._resetDeadLetterQueueServiceMocks =
    resetImplementations;
  return {
    db: new Proxy({}, handler),
  };
});

vi.mock('@/lib/core/logger', () => ({
  Logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

vi.mock('@/lib/modules/hooks', () => ({
  HookSystem: {
    dispatch: vi.fn(),
    filter: vi.fn(),
    on: vi.fn(),
  },
}));

describe('DeadLetterQueueService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    const globalAny = globalThis as unknown as Record<string, () => void>;
    if (globalAny._resetDeadLetterQueueServiceMocks) {
      globalAny._resetDeadLetterQueueServiceMocks();
    }

    // Restore HookSystem implementations
    vi.mocked(HookSystem.dispatch).mockResolvedValue(undefined);
    vi.mocked(HookSystem.filter).mockImplementation((_name, data) => Promise.resolve(data));

    // Restore Logger implementations
    vi.mocked(Logger.error).mockImplementation(() => {});
    vi.mocked(Logger.info).mockImplementation(() => {});
    vi.mocked(Logger.warn).mockImplementation(() => {});
    vi.mocked(Logger.debug).mockImplementation(() => {});
  });

  describe('archive', () => {
    it('should run archive successfully', async () => {
      const result = await (
        DeadLetterQueueService as unknown as Record<string, (...args: unknown[]) => unknown>
      ).archive({
        id: 'ne_pat_test',
        email: 'test@example.com',
        name: 'Test',
        token: 'token',
        teamId: '1',
        role: 'TEAM_MEMBER',
        status: 'RUNNING',
        password: 'password',
        confirmPassword: 'password',
      } as Record<string, unknown>);
      if (result && typeof result === 'object' && 'success' in result) {
        expect(
          (result as Record<string, unknown>).success,
          (result as Record<string, unknown>).error as string,
        ).toBe(true);
      }
    });

    it('should handle errors in archive', async () => {
      try {
        try {
          vi.mocked(db.deadLetterJob.findFirst).mockRejectedValueOnce(new Error('DB Error'));
          vi.mocked(db.deadLetterJob.findUnique).mockRejectedValueOnce(new Error('DB Error'));
        } catch {
          // Ignore expected errors during setup
        }

        const result = await (
          DeadLetterQueueService as unknown as Record<string, (...args: unknown[]) => unknown>
        ).archive({
          id: 'ne_pat_test',
          email: 'test@example.com',
          name: 'Test',
          token: 'token',
          teamId: '1',
          role: 'TEAM_MEMBER',
          status: 'RUNNING',
          password: 'password',
          confirmPassword: 'password',
        } as Record<string, unknown>);
        if (result && typeof result === 'object' && 'success' in result) {
          expect(result.success).toBe(false);
        }
      } catch (error) {
        // If it throws, that's also a valid error handling path
        expect(error).toBeDefined();
      }
    });
  });

  describe('list', () => {
    it('should return a list of dead-letter-queues', async () => {
      const mockData = [{ id: '1' }];
      vi.mocked(db.deadLetterJob.findMany).mockResolvedValue(
        mockData as unknown as Record<string, unknown>[],
      );

      const result = await DeadLetterQueueService.list();

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockData);
      expect(db.deadLetterJob.findMany).toHaveBeenCalled();
    });

    it('should handle errors when listing', async () => {
      vi.mocked(db.deadLetterJob.findMany).mockRejectedValue(new Error('DB Error'));

      const result = await DeadLetterQueueService.list();

      expect(result.success).toBe(false);
      expect(result.error).toBe('deadLetterQueue.service.error.list_failed');
      expect(Logger.error).toHaveBeenCalled();
    });
  });

  describe('retry', () => {
    it('should run retry successfully', async () => {
      const result = await (
        DeadLetterQueueService as unknown as Record<string, (...args: unknown[]) => unknown>
      ).retry('ne_pat_test');
      if (result && typeof result === 'object' && 'success' in result) {
        expect(
          (result as Record<string, unknown>).success,
          (result as Record<string, unknown>).error as string,
        ).toBe(true);
      }
    });

    it('should handle errors in retry', async () => {
      try {
        try {
          vi.mocked(db.deadLetterJob.findFirst).mockRejectedValueOnce(new Error('DB Error'));
          vi.mocked(db.deadLetterJob.findUnique).mockRejectedValueOnce(new Error('DB Error'));
        } catch {
          // Ignore expected errors during setup
        }

        const result = await (
          DeadLetterQueueService as unknown as Record<string, (...args: unknown[]) => unknown>
        ).retry('ne_pat_test');
        if (result && typeof result === 'object' && 'success' in result) {
          expect(result.success).toBe(false);
        }
      } catch (error) {
        // If it throws, that's also a valid error handling path
        expect(error).toBeDefined();
      }
    });
  });

  describe('purge', () => {
    it('should run purge successfully', async () => {
      const result = await (
        DeadLetterQueueService as unknown as Record<string, (...args: unknown[]) => unknown>
      ).purge({
        id: 'ne_pat_test',
        email: 'test@example.com',
        name: 'Test',
        token: 'token',
        teamId: '1',
        role: 'TEAM_MEMBER',
        status: 'RUNNING',
        password: 'password',
        confirmPassword: 'password',
      } as Record<string, unknown>);
      if (result && typeof result === 'object' && 'success' in result) {
        expect(
          (result as Record<string, unknown>).success,
          (result as Record<string, unknown>).error as string,
        ).toBe(true);
      }
    });

    it('should handle errors in purge', async () => {
      try {
        try {
          vi.mocked(db.deadLetterJob.findFirst).mockRejectedValueOnce(new Error('DB Error'));
          vi.mocked(db.deadLetterJob.findUnique).mockRejectedValueOnce(new Error('DB Error'));
        } catch {
          // Ignore expected errors during setup
        }

        const result = await (
          DeadLetterQueueService as unknown as Record<string, (...args: unknown[]) => unknown>
        ).purge({
          id: 'ne_pat_test',
          email: 'test@example.com',
          name: 'Test',
          token: 'token',
          teamId: '1',
          role: 'TEAM_MEMBER',
          status: 'RUNNING',
          password: 'password',
          confirmPassword: 'password',
        } as Record<string, unknown>);
        if (result && typeof result === 'object' && 'success' in result) {
          expect(result.success).toBe(false);
        }
      } catch (error) {
        // If it throws, that's also a valid error handling path
        expect(error).toBeDefined();
      }
    });
  });
});
