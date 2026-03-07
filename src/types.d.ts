import type { Agent } from './sdk/types.js';
declare global {
  namespace App {
    interface ActorMap {
      agent: Agent & { type: 'agent' };
    }
  }
}
