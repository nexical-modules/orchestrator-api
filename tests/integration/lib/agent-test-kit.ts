import type { ChildProcess } from 'child_process';
import path from 'node:path';
import fs from 'node:fs';

export interface AgentSpawnerOptions {
  /**
   * Environment variables to inject into the agent process
   */
  env?: Record<string, string>;
  /**
   * Whether to pipe stdout/stderr to the parent process
   */
  silent?: boolean;
}

export class AgentSpawner {
  private process: ChildProcess | null = null;
  private agentPath: string;

  constructor() {
    // Resolve path to the compiled agent script
    let root = process.cwd();
    while (root !== '/' && !fs.existsSync(path.join(root, 'package.json'))) {
      root = path.dirname(root);
    }
    // If we are in apps/backend, we need to go one level up to find the root of the workspace
    if (path.basename(root) === 'backend') {
      root = path.join(root, '../..');
    }
    this.agentPath = path.resolve(root, 'packages/agent/src/main.ts');
  }

  /**
   * Spawns the agent process using ts-node/tsx to run the source directly during testing
   */
  async start(options: AgentSpawnerOptions = {}) {
    if (this.process) {
      throw new Error('Agent is already running');
    }

    const combinedEnv: Record<string, string | undefined> = {
      ...process.env,
      ...options.env,
      // Ensure we don't accidentally inherit production secrets unless specified
      AGENT_API_TOKEN: options.env?.AGENT_API_TOKEN || 'ne_team_test_key',
      AGENT_API_URL: options.env?.AGENT_API_URL || 'http://localhost:4321/api',
      NODE_ENV: 'development', // Ensure main() runs even if parent is in test mode
    };

    // Explicitly remove variables if they are set to empty string (to ensure they are undefined in child)
    if (options.env && options.env['GITHUB_TOKEN'] === '') {
      delete combinedEnv.GITHUB_TOKEN;
    }

    const env = combinedEnv as NodeJS.ProcessEnv;

    // Use tsx or ts-node to run the agent source
    // Use spawn to mimic manual run
    // Use tsx via npx to run the agent source (handles aliases better and supports fork)
    // Use tsx directly from node_modules to avoid npx signal propagation issues
    let root = process.cwd();
    while (root !== '/' && !fs.existsSync(path.join(root, 'package.json'))) {
      root = path.dirname(root);
    }
    if (path.basename(root) === 'backend') {
      root = path.join(root, '../..');
    }
    const nodeExecutable = path.resolve(root, 'node_modules/.bin/tsx');

    if (!fs.existsSync(nodeExecutable)) {
      console.error(`[AgentSpawner] tsx not found at: ${nodeExecutable}`);
    }
    if (!fs.existsSync(this.agentPath)) {
      console.error(`[AgentSpawner] Agent source not found at: ${this.agentPath}`);
    }

    // Spawn directly
    const { spawn } = await import('child_process');
    this.process = spawn(nodeExecutable, [this.agentPath], {
      env,
      stdio: ['ignore', 'pipe', 'pipe'], // No IPC
    });

    if (!this.process.pid) {
      console.error('[AgentSpawner] Failed to get PID for spawned process');
    }

    this.process.stdout?.on('data', (data) => {
      console.info(`[Agent] ${data.toString().trim()}`);
    });

    this.process.stderr?.on('data', (data) => {
      console.error(`[Agent ERR] ${data.toString().trim()}`);
    });

    this.process.on('exit', (code, signal) => {
      console.info(`[Agent] Exited with code ${code} signal ${signal}`);
    });

    this.process.on('error', (err) => {
      console.error(`[Agent] Spawn Error:`, err);
    });

    console.info(`[AgentSpawner] Started Agent (PID: ${this.process.pid})`);

    // Give it a moment to initialize
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  async stop() {
    if (this.process) {
      console.info(`[AgentSpawner] Stopping Agent (PID: ${this.process.pid})...`);

      const exitPromise = new Promise((resolve) => {
        this.process?.on('exit', resolve);
      });

      this.process.kill('SIGTERM');

      // Wait up to 5 seconds for clean exit, then force kill
      const timeout = setTimeout(() => {
        this.process?.kill('SIGKILL');
      }, 5000);

      await exitPromise;
      clearTimeout(timeout);

      this.process = null;
    }
  }
}
