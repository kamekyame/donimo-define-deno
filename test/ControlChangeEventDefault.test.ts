// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertNotEquals, assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[ControlChangeEventDefault] Normal",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
      <ModuleData Name="test">
      <ControlChangeEventDefault ID="0" />
    </ModuleData>`;

    const f = Domino.File.fromXML(fileStr);
    f.toXML();

    assertNotEquals(f.moduleData.tags.controlChangeEventDefault, undefined);
  },
});

Deno.test({
  name: "[ControlChangeEventDefault] Invalid ID",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test">
    <ControlChangeEventDefault ID="dummy" />
  </ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
