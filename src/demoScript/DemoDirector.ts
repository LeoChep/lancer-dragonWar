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
    await this.displayController?.display("欢迎来到机甲世界");
    await this.displayController?.display("你将进行一场战斗测试");
    await this.displayController?.display("Are u ready?");
    let question1=await this.displayController?.question("准备好了吗",[{'id':"yes","chars":"yes"},{'id':"no","chars":"no"}]);

  }
}
export { DemoDirector };
