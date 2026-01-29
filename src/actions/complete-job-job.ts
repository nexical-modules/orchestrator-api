import { OrchestrationService } from "../services/orchestration-service";
import type { ServiceResponse } from "@/types/service";
import type { CompleteJobDTO, Job } from "../sdk/types";
import { HookSystem } from "@/lib/modules/hooks";
import type { APIContext } from "astro";

export class CompleteJobJobAction {
  public static async run(
    input: CompleteJobDTO,
    context: APIContext,
  ): Promise<ServiceResponse<Job>> {
    try {
      const { id, result } = input;
      const actor = context.locals.actor || (context as any).user;
      const actorId = input.actorId || actor?.id;
      const actorType =
        input.actorType ||
        (context.locals as any).actorType ||
        (actor?.id ? "user" : undefined);

      const updateRes = await OrchestrationService.complete(
        id,
        result,
        actorId,
        actorType,
      );

      if (!updateRes.success) {
        return updateRes;
      }

      return { success: true, data: updateRes.data };
    } catch (error) {
      console.error("CompleteJobJobAction Error:", error);
      return {
        success: false,
        error: "orchestrator.action.error.complete_failed",
      };
    }
  }
}
