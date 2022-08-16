// Copyright 2022 kamekyame. All rights reserved. MIT license.

import * as Domino from "../mod.ts";
import { assertEquals, Encoding } from "../deps.test.ts";

const folderPath = "./test/sample-files";

for await (const dirEntry of Deno.readDir(folderPath)) {
  if (!dirEntry.isFile) continue;
  // console.log(dirEntry);
  const f = await Deno.readFile(`${folderPath}/${dirEntry.name}`);
  const str = Encoding.convert(f, { to: "UTF8", from: "SJIS", type: "string" });

  Deno.test({
    name: `[restore-file] ${dirEntry.name}`,
    fn: () => {
      const file = Domino.File.fromXML(str);
      const file2 = Domino.File.fromXML(file.toXML());

      assertEquals(file, file2);
    },
  });
}
