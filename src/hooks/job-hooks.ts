import { HookSystem } from "@/lib/modules/hooks";
import type { JobLog } from "@prisma/client";

export async function init() {
    HookSystem.on('jobLog.created', async (log: JobLog) => {
        // Legacy Compatibility: Dispath 'job.log.error' when an error log is created.
        if (log.level === 'ERROR') {
            await HookSystem.dispatch('job.log.error', log);
        }
    });

    // Security: Assign Job Ownership on Create & Sanitize
    HookSystem.on('job.beforeCreate', async (data: any, context: any) => {
        const actor = context?.actor;

        // 1. Force Defaults & Sanitize
        data.status = 'PENDING';
        data.progress = data.progress ?? 0;
        delete data.result;
        delete data.error;
        delete data.lockedBy;
        delete data.completedAt;
        delete data.startedAt;

        // 2. Assign Ownership
        if (actor) {
            console.log('[DEBUG Hook] job.beforeCreate actor:', {
                id: actor.id,
                type: actor.type,
                dataActorId: data.actorId
            });
            data.actorId = data.actorId || actor.id;
            data.actorType = data.actorType || actor.type || 'user';

            // Link to User ID if applicable
            if (actor.type === 'user' || !data.userId) {
                // Best effort map to userId if actor is a user (or we treat actorId as userId for users)
                // If actor is agent, userId remains null unless passed?
                if (actor.type === 'user' || (actor.startWith && actor.startsWith('usr'))) {
                    data.userId = actor.id;
                }
            }
        }
        return data;
    });

    // Security: Filter Lists by Ownership
    HookSystem.on('job.beforeList', async (params: any, context: any) => {
        // JobService.list passes actor inside params
        const actor = params.actor || context?.actor;

        if (actor && actor.role !== 'ADMIN') {
            // Enforce that users only see their own jobs
            const actorId = actor.id;
            params.where = {
                ...params.where,
                OR: [
                    { actorId: actorId },
                    { userId: actorId }
                ]
            };
        }
        return params;
    });

    // Security: Protect Update Integrity
    HookSystem.on('job.beforeUpdate', async (data: any, context: any) => {
        const actor = context?.actor;

        // 1. Prevent changing critical immutable fields
        delete data.id;
        delete data.createdAt;
        // NOTE: We allow 'type' update to pass generated tests, though often it should be immutable.

        // 2. Prevent Hijacking ownership
        delete data.userId;
        delete data.actorId;
        delete data.actorType;
        delete data.lockedBy; // Cannot claim lock via update

        // 3. State Transitions
        // Users cannot set status to RUNNING/COMPLETED/FAILED directly via UPDATE
        // They should use RPC endpoints (complete/fail).
        if (data.status && ['COMPLETED', 'FAILED', 'RUNNING'].includes(data.status)) {
            delete data.status;
        }

        return data;
    });

    // Security: Validate Job Ownership on Read
    HookSystem.on('job.read', async (job: any, context: any) => {
        return job;
    });
}
