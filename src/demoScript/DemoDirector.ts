import type { DisplayController } from "./DisplayControllerType";
import { jumpIn_13 } from "./scenes/s13";

class DemoDirector implements DemoDirectorInterFace {
  displayController?: DisplayController;
  loadScene(scene: Scene): void {
    throw new Error("Method not implemented.");
  }
  init(): void {}
  start(): void {
    this.run();
  }
  async run(): Promise<void> {
    await this.displayController?.display(
      "你是个造访奥塔里（Otari）的流浪冒险家，这是座星石岛（the Starstone Isle）海岸边的小镇，而星石岛则是被一位古代神祇从大洋中抬升出来的巨大岛屿。奥塔里以木材和优质木船闻名，但这并不是让你在这里的原因——你来此是为寻求冒险！\r\n传闻一头凶猛的野兽正在捕食镇子上的家畜，镇长向任何可以终结这份威胁的英雄提供了10金币的赏金。这笔钱够你花上一个月了！\r\n在附近一家名叫乌鸦之桶（Crow’s Casks）的酒馆打听了之后，你了解到大多数袭击都发生在镇子的西侧，离海岸不远。这似乎是你开始搜寻的最佳地点。\r\n你收拾好行李，沿着满布礁石的海岸出发，开始你的狩猎。没过多久，你就找到了一个黑暗神秘的洞窟入口。"
    );
    jumpIn_13(this.displayController as DisplayController)
  }
}
export { DemoDirector };
