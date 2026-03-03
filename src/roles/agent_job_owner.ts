// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import { BaseRole } from './base-role';

/** */
export class AgentJobOwnerRole extends BaseRole {
  readonly name: string = 'AGENT_JOB_OWNER';
  protected readonly compatibleRoles: string[] = [
    'USER_EMPLOYEE',
    'USER_CLIENT',
    'TEAM_MEMBER',
    'USER',
    'AGENT',
  ];
  readonly description: string = '';
  readonly inherits: string[] = [];
  readonly permissions: string[] = [
    'job:create',
    'job:read',
    'job:cancel',
    'job:complete',
    'job:fail',
    'job:progress',
  ];

  public async check(
    context: unknown,
    input: Record<string, unknown>,
    data?: unknown,
  ): Promise<void> {
    await super.check(context, input, data);

    const locals = (context as { locals: Record<string, unknown> }).locals;
    const actor = locals.actor as { id: string; role: string };

    if (actor.role === 'AGENT_ADMIN') return;

    // Check ownership
    let ownerId = (input.actorId as string) || (data as { actorId?: string })?.actorId;

    if (!ownerId && (input.jobId || (data as { jobId?: string })?.jobId)) {
      const jobId = (input.jobId as string) || (data as { jobId?: string })?.jobId;
      const { db } = await import('@/lib/core/db');
      const job = await db.job.findUnique({ where: { id: jobId } });
      ownerId = job?.actorId ?? undefined;
    }

    if (!ownerId && (input.id || (data as { id?: string })?.id)) {
      const id = (input.id as string) || (data as { id?: string })?.id;
      const { pathname } = (context as { url: URL }).url;
      const { db } = await import('@/lib/core/db');

      if (pathname.includes('/api/job-log/')) {
        const jobLog = await db.jobLog.findUnique({
          where: { id },
          include: { job: true },
        });
        ownerId = jobLog?.job.actorId ?? undefined;
      } else if (pathname.includes('/api/job/')) {
        const job = await db.job.findUnique({ where: { id } });
        ownerId = job?.actorId ?? undefined;
      }
    }

    if (ownerId && ownerId !== actor.id) {
      throw new Error('Forbidden: Cannot act on behalf of another actor');
    }
  }
}
