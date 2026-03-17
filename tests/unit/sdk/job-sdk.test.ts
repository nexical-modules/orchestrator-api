// GENERATED CODE - DO NOT MODIFY
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { JobSDK } from '../../../src/sdk/job-sdk';

describe('JobSDK', () => {
  let sdk: JobSDK;
  let mockClient: { request: vi.Mock };

  beforeEach(() => {
    vi.clearAllMocks();
    mockClient = {
      request: vi.fn().mockResolvedValue({ success: true, data: { id: 'test-id' } }),
    };
    sdk = new JobSDK(mockClient as unknown as Record<string, unknown>);
  });

  it('should initialize', () => {
    expect(sdk).toBeDefined();
  });

  it('should call POST /[id]/complete on completeJob()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/[id]/complete'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>).completeJob(
      ...args,
    );

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('POST');

    let expectedPath = '[id]/complete';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on completeJob()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/[id]/complete'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).completeJob(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should call POST /[id]/fail on failJob()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/[id]/fail'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>).failJob(
      ...args,
    );

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('POST');

    let expectedPath = '[id]/fail';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on failJob()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/[id]/fail'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).failJob(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should call POST /[id]/cancel on cancelJob()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/[id]/cancel'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>).cancelJob(
      ...args,
    );

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('POST');

    let expectedPath = '[id]/cancel';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on cancelJob()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/[id]/cancel'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).cancelJob(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should call POST /[id]/progress on updateProgress()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/[id]/progress'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).updateProgress(...args);

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('POST');

    let expectedPath = '[id]/progress';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on updateProgress()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/[id]/progress'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).updateProgress(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should call GET /job on list()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/job'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('GET')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>).list(
      ...args,
    );

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('GET');

    let expectedPath = 'job';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on list()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/job'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('GET')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).list(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should call GET /job/[id] on get()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/job/[id]'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('GET')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>).get(...args);

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('GET');

    let expectedPath = 'job/[id]';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on get()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/job/[id]'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('GET')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).get(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should call POST /job on create()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/job'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>).create(
      ...args,
    );

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('POST');

    let expectedPath = 'job';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on create()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/job'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('POST')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).create(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should call PUT /job/[id] on update()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/job/[id]'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('PUT')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>).update(
      ...args,
    );

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('PUT');

    let expectedPath = 'job/[id]';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on update()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/job/[id]'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('PUT')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).update(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });

  it('should call DELETE /job/[id] on delete()', async () => {
    mockClient.request.mockResolvedValue({ success: true, data: {} });

    const args: unknown[] = [];
    const pathParams = '/job/[id]'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('DELETE')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    await (sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>).delete(
      ...args,
    );

    expect(mockClient.request).toHaveBeenCalled();
    const [callVerb, callPath] = mockClient.request.mock.calls[0];
    expect(callVerb).toBe('DELETE');

    let expectedPath = 'job/[id]';
    pathParams.forEach((p) => {
      expectedPath = expectedPath.replace(p, 'test-id');
    });
    expect(callPath).toContain(expectedPath);
  });

  it('should handle failure on delete()', async () => {
    mockClient.request.mockResolvedValue({ success: false, error: 'API Error' });

    const args: unknown[] = [];
    const pathParams = '/job/[id]'.match(/\[(\w+)\]/g) || [];
    pathParams.forEach(() => args.push('test-id'));

    if (['POST', 'PUT', 'PATCH'].includes('DELETE')) {
      args.push({ name: 'test' } as Record<string, unknown>);
    }

    const result = await (
      sdk as unknown as Record<string, (...args: unknown[]) => Promise<unknown>>
    ).delete(...args);
    expect(result.success).toBe(false);
    expect(result.error).toBe('API Error');
  });
});
