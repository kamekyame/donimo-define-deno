import * as Domino from "../mod.ts";

const folderPath = "./test/sample-files";

for await (const dirEntry of Deno.readDir(folderPath)) {
  if (!dirEntry.isFile) continue;
  // console.log(dirEntry);
  const str = await Deno.readTextFile(`${folderPath}/${dirEntry.name}`);

  Deno.test({
    name: `[restore-file] ${dirEntry.name}`,
    fn: () => {
      Domino.File.fromXML(str);
    },
  });
}
