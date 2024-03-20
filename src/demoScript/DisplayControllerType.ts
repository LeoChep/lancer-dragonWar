type ButtonItem={id:string,chars:string}
type  DisplayController={skip:()=>void,display:(value?:any)=>Promise<any>,question:(value?:any,button?:ButtonItem[])=>Promise<any>};
export type {ButtonItem,DisplayController}