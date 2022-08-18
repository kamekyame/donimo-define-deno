// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertEquals, assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[CCMFolder] Memo",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <Folder Name="dummy">
      <Memo>memo</Memo>
    </Folder>
  </ControlChangeMacroList></ModuleData>`;

    const f = Domino.File.fromXML(fileStr);
    let memoStr;
    f.moduleData.tags.controlChangeMacroList?.tags.forEach((tag) => {
      if (tag instanceof Domino.CCMFolder) {
        memoStr = tag.tags[0];
      }
    });
    assertEquals(memoStr, "memo");
  },
});

Deno.test({
  name: "[CCMFolder] Invalid Name",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <Folder ID="1"></Folder>
    <Folder ID="1"></Folder>
  </ControlChangeMacroList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[CCMFolder] Invalid Name",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <Folder Dummy="aaa">
    </Folder>
  </ControlChangeMacroList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[CCMFolder] Invalid ID",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <Folder Name="test-foler" ID="aaa">
    </Folder>
  </ControlChangeMacroList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
