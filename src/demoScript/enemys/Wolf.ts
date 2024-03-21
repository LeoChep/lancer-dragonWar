const wolf = {
  ac: 14,
  hp: 15,
  strike: jaw,
  x: 10,
  y: 10,
  touch: 5,
  enemys: [] as any[],
  map: {} as any,
  actionPoint: 3,
  ai: ai,
};
function jaw(target: any) {}
async function ai(this: {
  ac: number;
  hp: number;
  strike: (target: any) => void;
  x: number;
  y: number;
  touch: number;
  enemys: any[];
  map: any;
  actionPoint: number;
  ai: () => Promise<void>;
}) {
  while (this.actionPoint > 0) {
    let newEnemys = [] as any[];
    for (let index = 0; index < this.enemys.length; index++) {
      if (this.enemys[index].hp > 0) newEnemys.push(this.enemys[index]);
    }
    if (this.enemys.length == 0) {
      this.actionPoint--;
      continue;
    }

    this.enemys = newEnemys;
    if (
      Math.abs(this.enemys[0].x - this.x) < this.touch ||
      Math.abs(this.enemys[0].y - this.y) < this.touch
    ) {
      this.strike(this.enemys[0]);
    } else {
    }
  }
}
function findPath(finder: any, target: any, mapTr: boolean[][]) {
  const mapCost = [] as number[][][];
  const mapPath = [] as any[][][][];
  for (let x = 0; x < mapTr.length; x++) {
    for (let y = 0; y < mapTr[x].length; y++) {
      mapCost[x][y][0] = 999999;
      mapCost[x][y][1] = 999999;
      mapPath[x][y][0]  =[]
      mapPath[x][y][1]  =[]
    }
  }
  let finderX = Math.floor(finder.x / 5);
  let finderY = Math.floor(finder.y / 5);
  let targetX = Math.floor(target.x / 5);
  let targety = Math.floor(target.y / 5);
  mapCost[finderX][finderY][0] = 0;
  
  const temp = [{ x: finderX, y: finderY, haveAxis: 0 }];
  while (
    mapCost[targetX][targety][0] >= 999999 &&
    mapCost[targetX][targety][1] >= 999999 &&
    temp.length > 0
  ) {
    let starter = temp[0];
    let starterX = starter.x;
    let starterY = starter.y;
    let haveAxis = starter.haveAxis;
    mapPath[starterX][starterY][haveAxis].push({x:starterX,y:starterY})
    let cost = mapCost[starterX][starterY][haveAxis];
    if (
      mapTr[starterX - 1][starterY] &&
      cost + 5 < mapCost[starterX - 1][starterY][haveAxis]
    ) {
      mapCost[starterX - 1][starterY][haveAxis] = cost + 5;
      temp.push({ x: starterX - 1, y: starterY, haveAxis: haveAxis });
    }
    if (
      mapTr[starterX + 1][starterY] &&
      cost + 5 < mapCost[starterX + 1][starterY][haveAxis]
    ) {
      mapCost[starterX + 1][starterY][haveAxis] = cost + 5;
      temp.push({ x: starterX + 1, y: starterY, haveAxis: haveAxis });
    }
    if (
      mapTr[starterX][starterY - 1] &&
      cost + 5 < mapCost[starterX][starterY - 1][haveAxis]
    ) {
      mapCost[starterX][starterY - 1][haveAxis] = cost + 5;
      temp.push({ x: starterX, y: starterY - 1, haveAxis: haveAxis });
    }
    if (
      mapTr[starterX][starterY + 1] &&
      cost + 5 < mapCost[starterX][starterY + 1][haveAxis]
    ) {
      mapCost[starterX][starterY + 1][haveAxis] = cost + 5;
      temp.push({ x: starterX, y: starterY + 1, haveAxis: haveAxis });
    }
    //计算斜走
    let axisCost = 5;
    if (haveAxis == 1) {
      axisCost = 10;
      haveAxis = 0;
    } else {
      haveAxis = 1;
    }
    if (
      mapTr[starterX + 1][starterY + 1] &&
      cost + axisCost < mapCost[starterX + 1][starterY + 1][haveAxis]
    ) {
      mapCost[starterX + 1][starterY + 1][haveAxis] = cost + axisCost;
      temp.push({ x: starterX + 1, y: starterY + 1, haveAxis: haveAxis });
    }
    if (
      mapTr[starterX + 1][starterY - 1] &&
      cost + axisCost < mapCost[starterX + 1][starterY - 1][haveAxis]
    ) {
      mapCost[starterX + 1][starterY - 1][haveAxis] = cost + axisCost;
      temp.push({ x: starterX + 1, y: starterY - 1, haveAxis: haveAxis });
    }
    if (
      mapTr[starterX - 1][starterY - 1] &&
      cost + axisCost < mapCost[starterX - 1][starterY - 1][haveAxis]
    ) {
      mapCost[starterX - 1][starterY - 1][haveAxis] = cost + axisCost;
      temp.push({ x: starterX - 1, y: starterY - 1, haveAxis: haveAxis });
    }
    if (
      mapTr[starterX - 1][starterY + 1] &&
      cost + axisCost < mapCost[starterX - 1][starterY + 1][haveAxis]
    ) {
      mapCost[starterX - 1][starterY + 1][haveAxis] = cost + axisCost;
      temp.push({ x: starterX - 1, y: starterY + 1, haveAxis: haveAxis });
    }
    temp.shift();
  }
  let costResult = mapCost[targetX][targety][0];
  let pathResult = mapPath[targetX][targety][0];
  if (mapCost[targetX][targety][0] > mapCost[targetX][targety][1]){
    costResult = mapCost[targetX][targety][1];
    pathResult =mapPath[targetX][targety][1];
  }
    
  return {cost:costResult,path:pathResult}
}
