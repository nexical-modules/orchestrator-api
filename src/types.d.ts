import type { Agent, User } from './sdk/types.js';
declare global {
  namespace App {
    interface ActorMap {
      agent: Agent & { type: 'agent' };
      user: User & { type: 'user' };
    }
  }
}
