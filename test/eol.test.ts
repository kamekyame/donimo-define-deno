import * as Domino from "../mod.ts";
import { EOL } from "../deps.ts";
import { assertEquals, detect } from "../deps.test.ts";

Deno.test({
  name: "[eol] check EOL",
  fn: () => {
    const instrumentList = new Domino.InstrumentList([
      new Domino.InstrumentMap("test-map"),
    ]);

    const file = new Domino.File({ name: "test", folder: "test" }, {
      instrumentList,
    });
    const str = file.toXML({ spaces: 2 });
    assertEquals(detect(str), EOL.CRLF);
  },
});
