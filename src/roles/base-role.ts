// GENERATED CODE - DO NOT MODIFY
export abstract class BaseRole {
  abstract readonly name: string;
  protected readonly compatibleRoles: string[] = [];

  public async check(
    context: unknown,
    input: Record<string, unknown>,
    data?: unknown,
  ): Promise<void> {
    const locals = (context as { locals?: Record<string, unknown> }).locals;
    const actor = locals?.actor;

    if (!actor) {
      throw new Error('Unauthorized: Login required');
    }

    const { role } = actor as { role: string };
    if (role === 'AGENT_ADMIN') return;
    if (role === this.name) return;
    if (this.compatibleRoles.includes(role)) return;

    throw new Error(`Forbidden: required role ${this.name}`);
  }
}
