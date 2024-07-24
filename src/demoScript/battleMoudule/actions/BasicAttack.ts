import { parseDiceFormula } from "@/tools/DiceFormulaTrans";

type Weapon={
    dice:string
    bonus:number
    attachment:string
}
class BasicAttack extends abstractAction implements ActionInterface{
    weapon={dice:'1d4',bonus:0,attachment:""};
    beUsed= (useMan: Object, targets: Object[]) => {
        this.result=parseDiceFormula(this.weapon.dice)
        return this.result;
    };

}