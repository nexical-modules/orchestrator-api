
import { AgentClient } from '../networking/client.js';
import { JobExecutor } from './executor.js';
import type { JobProcessor } from '../core/processor.js';

export class JobPoller {
    private running: boolean = false;

    constructor(
        private client: AgentClient,
        private executor: JobExecutor,
        private processors: Record<string, JobProcessor<any>>,
        private agentId?: string
    ) { }

    public async start() {
        console.log('[JobPoller] Agent starting... polling for jobs.');
        this.running = true;
        const capabilities = Object.keys(this.processors);

        while (this.running) {
            try {
                // 1. Poll
                const job = await this.client.poll(capabilities, this.agentId);

                if (job) {
                    console.log(`Received job: ${job.type} (${job.id})`);

                    const processor = this.processors[job.type];
                    if (!processor) {
                        console.error(`No processor found for type ${job.type}`);
                        await this.client.fail(job.id, 'Processor not found on this agent');
                        continue;
                    }

                    // 2. Execute
                    try {
                        const result = await this.executor.execute(processor, job);

                        // 3. Complete
                        await this.client.complete(job.id, result);
                        console.log(`Job ${job.id} completed.`);

                    } catch (err: any) {
                        console.error(`Job ${job.id} failed:`, err);
                        await this.client.fail(job.id, err.message || 'Unknown error');
                    }
                }
            } catch (err) {
                console.error('Polling Loop Error:', err);
            }

            if (this.running) {
                await new Promise(r => setTimeout(r, 2000));
            }
        }
    }

    public stop() {
        this.running = false;
    }
}
