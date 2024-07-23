interface Object{}
interface ActionResultInfo{}
interface ActionInterface{
    beUsed:(useMan:Object,targets:Object[])=>ActionResultInfo
} 

abstract class BasicAction implements ActionInterface{
    result={} as ActionResultInfo;
    beUsed=(useMan:Object,targets:Object[])=>{
        this.result={msg:'use the BasicAction'}
        return this.result;
    }
}
interface ActionInsInterFace {
    action:ActionInterface
    useMan:Object;
    targets:Object[];
    getTargets:()=>Object[]
    setTargets:(targets:Object[])=>void;
    getUseMan:()=>Object;
    setUseMan:(useMan:Object)=>void;
    use:()=>ActionResultInfo
} 
class ActionIns implements ActionInsInterFace{
    action:ActionInterface
    useMan:Object;
    targets:Object[];
    getTargets=()=>{return this.targets}
    setTargets=(targets:Object[])=>{
        this.targets=targets;
    };
    getUseMan=()=>{
        return this.useMan;
    };
    setUseMan=(useMan:Object)=>{
        this.useMan=useMan;
    };
    use=()=>{
        return this.action.beUsed(this.useMan,this.targets);
    }
    constructor(action:ActionInterface,useMan:Object,targets:Object[]){
        this.action=action;
        this.useMan=useMan;
        this.targets=targets;
    }
}



