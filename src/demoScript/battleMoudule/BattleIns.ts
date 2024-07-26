import type { DisplayController } from "../DisplayControllerType";
import { BasicAttack } from "./actions/BasicAttack";
type button={
  id:string,
  chars:string,
  func:()=>any
}
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
      const buttonList=[] as button[]

      const attackItem=new BasicAttack()
      const attackButton = { id: "1", chars: attackItem.name,func:()=>{return attackItem.beUsed({},[])} };
      buttonList.push(attackButton);
      const runButton = { id: "2", chars: "run" };
      this.director.question("", [attackButton, runButton]).then((res) => {
        
        for (let button of buttonList){
          if (button.id==res){
            let result=button.func()
            console.log(result)
            this.director.display(result.msg);
          }
        }
     
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
