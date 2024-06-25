import type { DisplayController } from "../DisplayControllerType";
export class BattleIns {
  battleLock = {} as any;
  director!: DisplayController;
  init(director: DisplayController) {
    this.director = director;
    let battleLock = {} as any;
    this.battleLock = battleLock;
    battleLock.hasResolved = new Promise((resolve) => {
      battleLock.resolve = resolve;
    });
  }
  start() {
    const battleAction = () => {
      const attackButton = { id: "1", chars: "attack" };
      const runButton = { id: "2", chars: "run" };
      this.director.question("", [attackButton, runButton]).then((res) => {
        this.director.display(res);
        if (res == 2) {
          this.battleLock.resolve();
        } else {
          battleAction();
        }
      });
    };
    battleAction();
  }
}
