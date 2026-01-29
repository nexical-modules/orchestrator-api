import { OrchestrationService } from "../services/orchestration-service";
import type { ServiceResponse } from "@/types/service";
import type { FailJobDTO, Job } from "../sdk/types";
import type { APIContext } from "astro";

export class FailJobJobAction {
  public static async run(
    input: FailJobDTO,
    context: APIContext,
  ): Promise<ServiceResponse<Job>> {
    try {
      const { id, error } = input;
      const actor = context.locals.actor || (context as any).user;
      const actorId = input.actorId || actor?.id;
      const actorType =
        input.actorType ||
        (context.locals as any).actorType ||
        (actor?.id ? "user" : undefined);

      const updateRes = await OrchestrationService.fail(
        id,
        error,
        actorId,
        actorType,
      );

      if (!updateRes.success) {
        return updateRes;
      }

      return { success: true, data: updateRes.data };
    } catch (err) {
      console.error("FailJobJobAction Error:", err);
      return { success: false, error: "orchestrator.action.error.fail_failed" };
    }
  }
}
