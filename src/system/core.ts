class Core{

    getRoomIns(){}

   installDrama(roomIns:RoomIns,drama:Drama):void{}

    /*
    检查是否触发事件，hookins里携带有房间实例roomIns
    以及触发事件event
    和执行内容actions
    */
   checkHook(hookIns:HookIns):void{}

    /*
    执行一段命令，
    roomIns的sceneState会被改变，
    同时会增加新的演出movie{moments:Moment[]}
    */

    run(roomIns:RoomIns,actions:Actions):void{}


}

class CommonSystemCore{}

class DramaSystemCore{}

class TalkSystemCore{
    runAction()

    speak()


}

class BackGroundSystemCore{
    runAction()

    setBackground()
}

