// GENERATED CODE - DO NOT MODIFY
import { db } from '@/lib/core/db';
import type { ServiceResponse } from '@/types/service';
import { HookSystem } from '@/lib/modules/hooks';
import type { AgentApiKey, Prisma } from '@prisma/client';
import type { ApiActor } from '@/lib/api/api-docs';
import { Logger } from '@/lib/core/logger';

/** Service class for AgentApiKey-related business logic. */
export class AgentApiKeyService {
  public static async list(
    params?: Prisma.AgentApiKeyFindManyArgs,
    actor?: ApiActor,
  ): Promise<ServiceResponse<AgentApiKey[]>> {
    try {
      let { where, take, skip, orderBy, select } = params || {};

      // Allow hooks to modify the query parameters (e.g. for scoping)
      // Pass actor context if available
      const filteredParams = await HookSystem.filter('agentApiKey.beforeList', {
        where,
        take,
        skip,
        orderBy,
        select,
        actor,
      });
      where = filteredParams.where;
      take = filteredParams.take;
      skip = filteredParams.skip;
      orderBy = filteredParams.orderBy;
      select = filteredParams.select;

      const [data, total] = await db.$transaction([
        db.agentApiKey.findMany({ where, take, skip, orderBy, select }),
        db.agentApiKey.count({ where }),
      ]);

      const filteredData = await HookSystem.filter('agentApiKey.list', data);

      return { success: true, data: filteredData, total };
    } catch (error) {
      Logger.error('AgentApiKey list Error', error);
      return { success: false, error: 'agentApiKey.service.error.list_failed' };
    }
  }

  public static async get(
    id: string,
    select?: Prisma.AgentApiKeySelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<AgentApiKey | null>> {
    try {
      const data = await db.agentApiKey.findUnique({ where: { id }, select });
      if (!data) return { success: false, error: 'agentApiKey.service.error.not_found' };

      const filtered = await HookSystem.filter('agentApiKey.read', data, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('AgentApiKey get Error', error);
      return { success: false, error: 'agentApiKey.service.error.get_failed' };
    }
  }

  public static async create(
    data: Prisma.AgentApiKeyCreateInput,
    select?: Prisma.AgentApiKeySelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<AgentApiKey>> {
    try {
      // Pass actor context to hooks for security/authorship validation
      const input = await HookSystem.filter('agentApiKey.beforeCreate', data, { actor });

      const newItem = await db.$transaction(async (tx) => {
        const created = await tx.agentApiKey.create({
          data: input as Prisma.AgentApiKeyCreateInput,
          select,
        });
        await HookSystem.dispatch('agentApiKey.created', {
          id: created.id,
          actorId: actor?.id || 'system',
        });
        return created;
      });

      const filtered = await HookSystem.filter('agentApiKey.read', newItem, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('AgentApiKey create Error', error);
      return { success: false, error: 'agentApiKey.service.error.create_failed' };
    }
  }

  public static async update(
    id: string,
    data: Prisma.AgentApiKeyUpdateInput,
    select?: Prisma.AgentApiKeySelect,
    actor?: ApiActor,
  ): Promise<ServiceResponse<AgentApiKey>> {
    try {
      const input = await HookSystem.filter('agentApiKey.beforeUpdate', data, { actor, id });

      const updatedItem = await db.$transaction(async (tx) => {
        const updated = await tx.agentApiKey.update({
          where: { id },
          data: input as Prisma.AgentApiKeyUpdateInput,
          select,
        });
        await HookSystem.dispatch('agentApiKey.updated', {
          id,
          changes: Object.keys(input),
          actorId: actor?.id,
        });
        return updated;
      });

      const filtered = await HookSystem.filter('agentApiKey.read', updatedItem, { actor });

      return { success: true, data: filtered };
    } catch (error) {
      Logger.error('AgentApiKey update Error', error);
      return { success: false, error: 'agentApiKey.service.error.update_failed' };
    }
  }

  public static async delete(id: string, actor?: ApiActor): Promise<ServiceResponse<void>> {
    try {
      await db.$transaction(async (tx) => {
        await tx.agentApiKey.delete({ where: { id } });
        await HookSystem.dispatch('agentApiKey.deleted', { id, actorId: actor?.id });
      });
      return { success: true };
    } catch (error) {
      Logger.error('AgentApiKey delete Error', error);
      return { success: false, error: 'agentApiKey.service.error.delete_failed' };
    }
  }
}
