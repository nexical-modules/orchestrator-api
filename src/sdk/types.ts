export interface CreateJobDTO {
  type: string;
  payload: any;
  actorId?: string;
  actorType?: string;
  userId?: string;
  progress?: number;
}

export interface PollJobsDTO {
  capabilities: string[];
}

export interface CompleteJobDTO {
  result: any;
}

export interface FailJobDTO {
  error: any;
}

export interface RegisterAgentDTO {
  id?: string;
  hostname: string;
  capabilities: string[];
}

export type JobStatus = (typeof JobStatus)[keyof typeof JobStatus];
export type AgentStatus = (typeof AgentStatus)[keyof typeof AgentStatus];

export const JobStatus = {
  PENDING: "PENDING",
  RUNNING: "RUNNING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;
export const AgentStatus = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
  BUSY: "BUSY",
} as const;

export type { Job, JobLog, Agent } from "@prisma/client";
