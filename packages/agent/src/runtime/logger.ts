
import { NexicalClient } from '@nexical/sdk';

export class JobRemoteLogger {
    constructor(
        private client: NexicalClient,
        private jobId: string
    ) { }

    private async log(level: string, message: string, ...args: any[]) {
        const formattedMessage = args.length > 0
            ? `${message} ${args.map(a => JSON.stringify(a)).join(' ')}`
            : message;

        // Log to local console for immediate visibility
        const consoleMethod = level.toLowerCase() === 'error' ? 'error' : (level.toLowerCase() === 'warn' ? 'warn' : 'log');
        (console as any)[consoleMethod](`[Job ${this.jobId}] [${level}] ${formattedMessage}`);

        try {
            // Transmit to application
            await this.client.orchestrator.jobLog.create({
                jobId: this.jobId,
                level,
                message: formattedMessage
            });
        } catch (err) {
            console.error(`[JobRemoteLogger] Failed to transmit log:`, err);
        }
    }

    info(msg: string, ...args: any[]) {
        this.log('INFO', msg, ...args);
    }

    error(msg: string, ...args: any[]) {
        this.log('ERROR', msg, ...args);
    }

    warn(msg: string, ...args: any[]) {
        this.log('WARN', msg, ...args);
    }
}
