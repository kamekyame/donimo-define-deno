import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[CCMLink] Invalid ID",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <CCMLink Dummy="aaa"/>
  </ControlChangeMacroList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[CCMLink] Invalid Value",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <CCMLink ID="0" Value="aaa"/>
  </ControlChangeMacroList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[CCMLink] Invalid Gate",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <CCMLink ID="0" Gate="aaa"/>
  </ControlChangeMacroList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
