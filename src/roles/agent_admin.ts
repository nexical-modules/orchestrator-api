// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import { BaseRole } from './base-role';

/** */
export class AgentAdminRole extends BaseRole {
  readonly name: string = 'AGENT_ADMIN';
  protected readonly compatibleRoles: string[] = ['USER_ADMIN', 'TEAM_ADMIN', 'ADMIN'];
  readonly description: string = '';
  readonly inherits: string[] = [];
  readonly permissions: string[] = ['job:read_all', 'agent:read_all', 'system:maintain'];
}
