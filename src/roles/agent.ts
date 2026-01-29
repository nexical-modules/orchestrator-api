import type { RolePolicy } from "@/lib/registries/role-registry";
import { type APIContext, type AstroGlobal } from "astro";

export class IsAgent implements RolePolicy {
    async check(context: AstroGlobal | APIContext, input: Record<string, any>, data?: any): Promise<void> {
        const actor = context.locals?.actor || (context as any).user;

        if (!actor) {
            throw new Error("Unauthorized: Login required");
        }
    }
}
