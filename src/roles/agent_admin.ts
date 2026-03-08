// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import { BaseRole } from './base-role';
import { roleRegistry } from '@/lib/registries/role-registry';

/** */
export class AgentAdminRole extends BaseRole {
  readonly name: string = 'AGENT_ADMIN';
  protected readonly compatibleRoles: string[] = [];
  readonly description: string = '';
  readonly inherits: string[] = ['AGENT_JOB_OWNER'];
  readonly permissions: string[] = [
    'job:read_all',
    'agent:read_all',
    'agent:manage_keys',
    'system:maintain',
  ];
}
roleRegistry.register(new AgentAdminRole());
