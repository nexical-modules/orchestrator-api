// GENERATED CODE - DO NOT MODIFY
import type { AgentApiKey } from '@prisma/client';
export interface CreateJobDTO {
  type: string;
  payload: unknown;
  actorId?: string;
  actorType?: string;
  userId?: string;
}
export interface PollJobsDTO {
  agentId: string;
  capabilities: string[];
}
export interface UpdateProgressDTO {
  id: string;
  progress: number;
}
export interface JobMetrics {
  total: number;
  pending: number;
  running: number;
  completed: number;
  failed: number;
  cancelled: number;
  avgCompletionTimeMs?: number;
  retryRate: number;
  successRate: number;
}
export interface AgentMetrics {
  total: number;
  online: number;
  offline: number;
  busy: number;
  jobsProcessedLast24h: number;
}
export interface CompleteJobDTO {
  id: string;
  result?: unknown;
}
export interface FailJobDTO {
  id: string;
  error?: unknown;
}
export interface CancelJobDTO {
  id: string;
}
export interface HeartbeatDTO {
  id: string;
}
export interface RegisterAgentDTO {
  id?: string;
  name?: string;
  hostname: string;
  capabilities: string[];
}
export interface CreateAgentApiKeyDTO {
  agentId: string;
  name: string;
  expiresAt?: Date;
}
export interface DeleteAgentApiKeyDTO {
  id: string;
  agentId?: string;
}
export interface CreateAgentApiKeyResponseDTO {
  token: AgentApiKey;
  rawKey: string;
}
export enum JobStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}
export enum AgentStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  BUSY = 'BUSY',
}
export enum AgentRole {
  AGENT_ADMIN = 'AGENT_ADMIN',
  AGENT_JOB_OWNER = 'AGENT_JOB_OWNER',
}
export type { Agent, AgentApiKey, DeadLetterJob, Job, JobLog } from '@prisma/client';
