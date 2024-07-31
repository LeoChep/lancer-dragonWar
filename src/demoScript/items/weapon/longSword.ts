import { BasicAttack } from "@/demoScript/battleMoudule/actions/BasicAttack"

class LongSword{
    name='长剑'
    actions=[]
    constructor(){
        const attack=new BasicAttack();
        attack.name='长剑攻击'
        attack.weapon={dice:'1d8',bonus:0,attachment:""};
    }
}