import type { RolePolicy } from "@/lib/registries/role-registry";
import { type APIContext, type AstroGlobal } from "astro";

export class IsAgent implements RolePolicy {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async check(context: AstroGlobal | APIContext, input: Record<string, unknown>, data?: any): Promise<void> {
        const actor = context.locals?.actor;

        if (!actor) {
            throw new Error("Unauthorized: Login required");
        }
    }
}
