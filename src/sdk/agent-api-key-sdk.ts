// GENERATED CODE - DO NOT MODIFY
import { BaseResource } from '@nexical/sdk-core';
import type { AgentApiKey, CreateAgentApiKeyDTO, CreateAgentApiKeyResponseDTO } from './types.js';

/** SDK client for AgentApiKey. */
export class AgentApiKeySDK extends BaseResource {
  public async list(params?: {
    search?: string;
    take?: number;
    skip?: number;
    orderBy?: string | Record<string, 'asc' | 'desc'>;
    filters?: Record<string, unknown>;
  }): Promise<{ success: boolean; data: AgentApiKey[]; error?: string; meta: { total: number } }> {
    let orderBy = params?.orderBy;
    if (orderBy && typeof orderBy === 'object') {
      const keys = Object.keys(orderBy);
      if (keys.length > 0) {
        orderBy = `${keys[0]}:${orderBy[keys[0]]}`;
      }
    }
    const query = this.buildQuery({
      ...params?.filters,
      search: params?.search,
      take: params?.take,
      skip: params?.skip,
      orderBy,
    });
    return this._request('GET', `/agent-api-key${query}`);
  }

  public async get(id: string): Promise<{ success: boolean; data: AgentApiKey; error?: string }> {
    return this._request('GET', `/agent-api-key/${id}`);
  }

  public async createAgentApiKey(
    data: CreateAgentApiKeyDTO,
  ): Promise<{ success: boolean; data: CreateAgentApiKeyResponseDTO; error?: string }> {
    return this._request('POST', `/agent-api-key/keys`, data);
  }

  public async deleteAgentApiKey(
    id: string,
  ): Promise<{ success: boolean; data: AgentApiKey; error?: string }> {
    return this._request('DELETE', `/agent-api-key/keys/${id}`);
  }
}
