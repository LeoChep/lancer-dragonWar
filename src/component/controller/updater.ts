interface Message {
    content: string;
    id: number;
  }
  interface SceneState {
    actorStates: ActorState[];
  }
  interface Position {
    x: number;
    y: number;
  }
  interface ActorState {
    name: string;
    postion: Position;
  }
export class Updater {
    actors?: ActorState[];
    update(state: SceneState) {
        if (this.actors && this?.actors?.length > 0)
            for (let updateActor of this.actors) {
                let target;
                for (let temp of state.actorStates) {
                    if (temp?.name === updateActor?.name) {
                        target = temp;
                    }
                }
                if (!target) {
                    target = {} as ActorState;
                    state.actorStates.push(target)
                }
                Object.assign(target, updateActor);
            }
    }
    constructor(){}
}