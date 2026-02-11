// GENERATED CODE - DO NOT MODIFY
import { JobProcessor, type ProcessorConfig, type AgentJob } from '@nexical/agent';
import { z } from 'zod';

export class EchoProcessor extends JobProcessor<unknown> {
  static jobType: string = 'EchoProcessor';
  schema: z.ZodObject<z.ZodRawShape> = z.object({
    message: z.string(),
  });

  constructor(config: ProcessorConfig) {
    super(config);
  }

  public async process(job: AgentJob<unknown>) {
    const { message: _message } = job.payload;
    console.info(`[EchoProcessor] Processing job ${job.id}`);
    // TODO: Implement processing logic
  }
}
