import { describe, it, expect } from 'vitest';
import { JobProcessor } from '../../../src/core/processor';
import { z } from 'zod';
import { vi } from 'vitest';

vi.mock('@nexical/sdk', () => {
    return {
        NexicalClient: class MockClient {
            constructor(public config: any) { }
        }
    };
});

// Concrete implementation for testing
class TestProcessor extends JobProcessor<any> {
    jobType = 'test.job';
    schema = z.object({ foo: z.string() });

    async process() {
        // no-op
    }

    // Helper to expose api for assertions
    getApi() { return this.api; }
}

describe('JobProcessor', () => {
    it('should initialize with correct config', () => {
        const processor = new TestProcessor({
            apiUrl: 'http://test-api',
            apiToken: 'test-token'
        });

        const api = processor.getApi();
        expect(api).toBeDefined();
        // We can't easily check private properties of the client without casting
        expect((api as any).config.baseUrl).toBe('http://test-api');
    });
});
