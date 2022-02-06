import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[File] Invalid encoding",
  fn: () => {
    const fileStr = '<?xml version="1.0" encoding="UTF-8"?>';
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[File] Not found ModuelData",
  fn: () => {
    const fileStr = '<?xml version="1.0" encoding="Shift_JIS"?>';
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
