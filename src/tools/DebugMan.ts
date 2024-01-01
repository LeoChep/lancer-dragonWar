const DebugMan={debugFor:""}
const DebugConsole=(debugFor:string,...pri:any)=>{
    if (DebugMan.debugFor==debugFor){
        console.log(...pri)
    }
}
export {DebugMan,DebugConsole}