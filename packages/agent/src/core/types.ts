import { z } from 'zod';


export interface AgentJob<T = any> {
    id: string;
    type: string;
    payload: T;
}

export interface AgentContext {
    // We can add a constrained SDK client here later if needed
    // or just the raw capabilities
    logger: {
        info(msg: string, ...args: any[]): void;
        error(msg: string, ...args: any[]): void;
        warn(msg: string, ...args: any[]): void;
    };
    api: any; // NexicalClient (Used as any to prevent circular dependency in SDK Types)
}

export interface AgentResult {
    success: boolean;
    data?: any;
    error?: any;
}

export interface AgentWorker<T = any> {
    jobType: string;
    schema: z.ZodSchema<T>;
    handler(job: AgentJob<T>, context: AgentContext): Promise<AgentResult | void>;
}
