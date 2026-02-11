// GENERATED CODE - DO NOT MODIFY
import { BaseRole } from './base-role';

/** */
export class AdminRole extends BaseRole {
  readonly name: string = 'ADMIN';
  readonly description: string = '';
  readonly inherits: string[] = [];
  readonly permissions: string[] = ['job:read_all', 'agent:read_all', 'system:maintain'];
}
