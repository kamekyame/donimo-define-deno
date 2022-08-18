// Copyright 2022 kamekyame. All rights reserved. MIT license.

import * as Domino from "../mod.ts";
import { xml2js } from "../deps.ts";
import { assertEquals, Encoding } from "../deps.test.ts";

const folderPath = "./test/sample-files";

for await (const dirEntry of Deno.readDir(folderPath)) {
  if (!dirEntry.isFile) continue;

  Deno.test({
    name: `[restore-file] ${dirEntry.name}`,
    fn: async (t) => {
      // console.log(dirEntry);
      const f = await Deno.readFile(`${folderPath}/${dirEntry.name}`);
      let str = Encoding.convert(f, {
        to: "UNICODE",
        from: "SJIS",
        type: "string",
      });

      // ok_GSmに含まれるDefaultData TrackタグのChが大文字になっている問題を修正
      str = str.replaceAll(/<Track(.+?)CH/g, "<Track$1Ch");
      // SC-8850などに含まれるtypo(Defualt)を修正
      str = str.replaceAll("Defualt", "Default");
      // SC-8850などに含まれるDataタグのValue属性を削除
      str = str.replaceAll(/<Data (.*?)>/g, "<Data>");

      const domino = Domino.File.fromXML(str);
      const dominoToXml = domino.toXML();
      const dominoRestored = Domino.File.fromXML(dominoToXml);

      const xml = xml2js(str, {
        compact: false,
        nativeTypeAttributes: true,
        alwaysChildren: true,
      });
      const xmlRestored = xml2js(dominoToXml, {
        compact: false,
        nativeTypeAttributes: true,
        alwaysChildren: true,
      });

      // await Deno.writeTextFile("xml.json", JSON.stringify(xml, null, 2));
      // await Deno.writeTextFile(
      //   "xmlRestored.json",
      //   JSON.stringify(xmlRestored, null, 2),
      // );

      await t.step({
        name: `toXML -> fromXML`,
        fn: () => {
          assertEquals(domino, dominoRestored);
        },
      });

      await t.step({
        name: `xml2js`,
        fn: () => {
          assertEquals(xml, xmlRestored);
        },
      });
    },
  });
}
