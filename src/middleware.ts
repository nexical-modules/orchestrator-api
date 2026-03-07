// GENERATED CODE - DO NOT MODIFY
import type { APIContext, MiddlewareNext } from 'astro';
import { db } from '@/lib/core/db';
import crypto from 'node:crypto';

export async function onRequest(context: APIContext, next: MiddlewareNext) {
  const publicRoutes: string[] = [];
  if (publicRoutes.some((route) => context.url.pathname.startsWith(route))) return next();
  const authHeader = context.request.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer sk_agent_')) {
    const token = authHeader.substring(7);
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const tokenEntity = await db.agentApiKey.findFirst({
      where: { hashedKey: hashedToken },
      include: { agent: true },
    });
    const entity = tokenEntity?.agent;

    if (entity) {
      context.locals.actor = {
        ...entity,
        type: 'agent',
        role: entity && 'role' in entity ? (entity as { role: string }).role : 'AGENT_ADMIN',
      };
      context.locals.actorType = 'agent';
      return next();
    }
  }
  const session = (context.locals as { session?: unknown }).session;
  if (session) {
    const user = await session.get('user');
    if (user) {
      // Compatibility with Actor system
      context.locals.actor = user;
      context.locals.actorType = 'user';
    }
  }
  if (context.locals.actor && context.locals.actorType === 'agent') {
    const actorCheck = await db.agent.findUnique({
      where: { id: context.locals.actor.id },
      select: { status: true },
    });

    if (!actorCheck || actorCheck.status !== 'ONLINE') {
      context.locals.actor = undefined;
      return new Response(JSON.stringify({ error: 'Session revoked' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return next();
  }
  return next();
}
export default { onRequest };
