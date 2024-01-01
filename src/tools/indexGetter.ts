const runDev = {} as any;
export function getAssetFiles(folder?: string) {
  if (!folder) folder = "";
  console.log("rundev", runDev);
  try {
    const isDev = (window as any)?.api?.getIsDev();
    console.log("isDev", isDev);
    let resourcesPath = "";
    if (isDev) {
      resourcesPath = "./src/renderer/public/asset/" + folder;
    } else {
      resourcesPath = "./resources/asset/" + folder;
    }
    const files = (window as any)?.api?.readFolder(resourcesPath);

    files.then((res: any) => {
      console.log(res);
      return res;
    });
    return files;
    // return files;
  } catch (e) {}
  //在非electron环境
  let files: any;
  if (folder == "") files = import.meta.glob("../../public/asset/" + "*.*");
  if (folder == "monster")
    files = import.meta.glob("../../public/asset/monster/" + "*.*");

  const pormise = new Promise((resolve) => {
    const filesName = [] as string[];
    console.log(files);

    for (let key in files) {
      let path = (files as any)[key].name as string;
      let parts = path.split("/");
      let name = "";
      for (let part of parts) {
        if (part.endsWith(".json")) name = part.replace(".json", "");
      }
      if (name && name != "") filesName.push(name);
    }
    console.log(filesName);
    resolve(filesName);
  });

  return pormise;
}
export { runDev };
