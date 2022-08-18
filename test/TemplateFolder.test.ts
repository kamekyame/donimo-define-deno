// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertEquals, assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[TemplateFolder] Invalid ID",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><TemplateList>
    <Folder Dummy="aaa">
    </Folder>
  </TemplateList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[TemplateFolder] Nested Folder",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><TemplateList>
    <Folder Name="dummy">
      <Folder Name="dummy"></Folder>
    </Folder>
  </TemplateList></ModuleData>`;
    const file = Domino.File.fromXML(fileStr);
    const file2 = Domino.File.fromXML(file.toXML());

    assertEquals(file, file2);
  },
});
