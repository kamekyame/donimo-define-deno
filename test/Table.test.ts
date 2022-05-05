// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[Table] Invalid ID",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <Table ID="-1"></Table>
  </ControlChangeMacroList></ModuleData>`;

    const file = Domino.File.fromXML(fileStr);
    assertThrows(() => {
      file.toXML();
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Table] Invalid ID",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <Table ID="aaa"></Table>
  </ControlChangeMacroList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
