import type { DisplayController } from "../DisplayControllerType";
import { BattleIns } from "./BattleIns";
export class BattleManager {
  director: DisplayController | undefined;
  static startBattle(director: DisplayController) {
    const battle=new BattleIns();
    battle.init(director);
    battle.start()
    return battle;
  }
  static afterEnd(battle:BattleIns){
    return battle.battleLock.hasResolved;
  }
}
