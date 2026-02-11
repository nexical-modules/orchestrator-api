// GENERATED CODE - DO NOT MODIFY
import { BaseResource } from '@nexical/sdk-core';
import type { PollJobsDTO, Job } from './types.js';

/** SDK client for Orchestrator. */
export class OrchestratorSDK extends BaseResource {
  public async pollJobs(
    data: PollJobsDTO,
  ): Promise<{ success: boolean; data: Job[]; error?: string }> {
    return this._request('POST', `/orchestrator/poll`, data);
  }

  public async checkStaleAgents(): Promise<{ success: boolean; data: void; error?: string }> {
    return this._request('POST', `/orchestrator/check-stale`);
  }
}
