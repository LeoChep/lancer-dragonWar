import { parseDiceFormula } from "@/tools/DiceFormulaTrans";
import { abstractAction,  type ActionInterface } from "./BasicAction";

type Weapon={
    dice:string
    bonus:number
    attachment:string
}
export class BasicAttack extends abstractAction implements ActionInterface{
    name ='基础攻击'
    weapon={dice:'1d4',bonus:0,attachment:""};
    beUsed= (useMan: Object, targets: Object[]) => {
        const formula=parseDiceFormula(this.weapon.dice) 
        formula.getValue()
        this.result={msg:formula.toString(),formula:formula}
        return this.result;
    };

}