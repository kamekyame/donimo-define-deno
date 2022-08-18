// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertNotEquals, assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[ExclusiveEventDefault] Normal",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
      <ModuleData Name="test">
      <ExclusiveEventDefault Data="f0h 41h 10h 42h f7h" />
    </ModuleData>`;

    const f = Domino.File.fromXML(fileStr);
    f.toXML();

    assertNotEquals(f.moduleData.tags.exclusiveEventDefault, undefined);
  },
});

Deno.test({
  name: "[ExclusiveEventDefault] Invalid Data",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test">
    <ExclusiveEventDefault Data="123" />
  </ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
