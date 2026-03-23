// GENERATED CODE - DO NOT MODIFY
import { ApiGuard } from '@/lib/api/api-guard';
import { createMockAstroContext } from '@tests/unit/helpers';
import type { APIContext } from 'astro';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GET } from '../../../../../src/pages/api/job/index';
import { JobService } from '../../../../../src/services/job-service';
vi.mock('../../../../../src/services/job-service');
vi.mock('@/lib/api/api-guard');
describe('Job API - GET ../../../../../src/pages/api/job/index', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(ApiGuard.protect).mockResolvedValue(undefined);
  });

  it('should call JobService and return success', async () => {
    const query = ['GET', 'DELETE'].includes('GET'.toUpperCase())
      ? `?type=${encodeURIComponent(String('test'))}&userId=${encodeURIComponent(String('test'))}&actorId=${encodeURIComponent(String('test'))}&actorType=${encodeURIComponent(String('test'))}&payload=${encodeURIComponent(String({}))}&result=${encodeURIComponent(String({}))}&error=${encodeURIComponent(String({}))}&status=${encodeURIComponent(String('PENDING'))}&progress=${encodeURIComponent(String(100))}&lockedBy=${encodeURIComponent(String('test'))}&lockedAt=${encodeURIComponent(String(new Date().toISOString()))}&startedAt=${encodeURIComponent(String(new Date().toISOString()))}&completedAt=${encodeURIComponent(String(new Date().toISOString()))}&retryCount=${encodeURIComponent(String(100))}&maxRetries=${encodeURIComponent(String(100))}&nextRetryAt=${encodeURIComponent(String(new Date().toISOString()))}`
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'GET',
    });

    const serviceMethod =
      'GET'.toLowerCase() === 'post'
        ? 'create'
        : 'GET'.toLowerCase() === 'get'
          ? '../../../../../src/pages/api/job/index'.includes('[id]')
            ? 'get'
            : 'list'
          : 'GET'.toLowerCase() === 'put'
            ? 'update'
            : 'GET'.toLowerCase() === 'delete'
              ? 'delete'
              : 'list';

    vi.mocked((JobService as Record<string, unknown>)[serviceMethod]).mockResolvedValue({
      success: true,
      data: { id: 'test-id' },
    } as Record<string, unknown>);

    const response = await GET(mockContext);

    if (response instanceof Response) {
      const body = await response.json();
      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
    } else {
      expect((response as unknown as Record<string, boolean>).success).toBe(true);
    }
  });

  it('should return 400 when invalid input is provided (scaffold)', async () => {
    const query = ['GET', 'DELETE'].includes('GET'.toUpperCase())
      ? `?type=${encodeURIComponent(String('test'))}&userId=${encodeURIComponent(String('test'))}&actorId=${encodeURIComponent(String('test'))}&actorType=${encodeURIComponent(String('test'))}&payload=${encodeURIComponent(String({}))}&result=${encodeURIComponent(String({}))}&error=${encodeURIComponent(String({}))}&status=${encodeURIComponent(String('PENDING'))}&progress=${encodeURIComponent(String(100))}&lockedBy=${encodeURIComponent(String('test'))}&lockedAt=${encodeURIComponent(String(new Date().toISOString()))}&startedAt=${encodeURIComponent(String(new Date().toISOString()))}&completedAt=${encodeURIComponent(String(new Date().toISOString()))}&retryCount=${encodeURIComponent(String(100))}&maxRetries=${encodeURIComponent(String(100))}&nextRetryAt=${encodeURIComponent(String(new Date().toISOString()))}`
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'GET',
    });

    try {
      const response = await GET(mockContext);
      if (response instanceof Response) {
        expect([400, 500]).toContain(response.status);
      }
    } catch {
      // Expected if it throws on invalid json
    }
  });

  it('should return 500 when action fails', async () => {
    const query = ['GET', 'DELETE'].includes('GET'.toUpperCase())
      ? `?type=${encodeURIComponent(String('test'))}&userId=${encodeURIComponent(String('test'))}&actorId=${encodeURIComponent(String('test'))}&actorType=${encodeURIComponent(String('test'))}&payload=${encodeURIComponent(String({}))}&result=${encodeURIComponent(String({}))}&error=${encodeURIComponent(String({}))}&status=${encodeURIComponent(String('PENDING'))}&progress=${encodeURIComponent(String(100))}&lockedBy=${encodeURIComponent(String('test'))}&lockedAt=${encodeURIComponent(String(new Date().toISOString()))}&startedAt=${encodeURIComponent(String(new Date().toISOString()))}&completedAt=${encodeURIComponent(String(new Date().toISOString()))}&retryCount=${encodeURIComponent(String(100))}&maxRetries=${encodeURIComponent(String(100))}&nextRetryAt=${encodeURIComponent(String(new Date().toISOString()))}`
      : '';
    const fullUrl = 'http://localhost/api/test' + query;

    const mockContext = createMockAstroContext({
      url: fullUrl,
      params: { id: 'test-id' },
      locals: { actor: { id: 'user-1', type: 'user', email: 'test@example.com' } },
    }) as unknown as APIContext;

    mockContext.request = new Request(fullUrl, {
      method: 'GET',
    });

    const serviceMethod =
      'GET'.toLowerCase() === 'post'
        ? 'create'
        : 'GET'.toLowerCase() === 'get'
          ? '../../../../../src/pages/api/job/index'.includes('[id]')
            ? 'get'
            : 'list'
          : 'GET'.toLowerCase() === 'put'
            ? 'update'
            : 'GET'.toLowerCase() === 'delete'
              ? 'delete'
              : 'list';

    vi.mocked((JobService as Record<string, unknown>)[serviceMethod]).mockResolvedValue({
      success: false,
      error: 'Something went wrong',
    } as Record<string, unknown>);

    const response = await GET(mockContext);

    if (response instanceof Response) {
      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.error).toBe('Something went wrong');
    }
  });
});
