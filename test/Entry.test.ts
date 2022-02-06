import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[Entry] Invalid Value",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <CCM ID="1" Name="test-ccm" Color="#ff0000" Sync="Last">
      <Value>
        <Entry Value="0"/>
      </Value>
    </CCM>
  </ControlChangeMacroList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Entry] Invalid Value",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <CCM ID="1" Name="test-ccm" Color="#ff0000" Sync="Last">
      <Value>
        <Entry Label="test-entry"/>
      </Value>
    </CCM>
  </ControlChangeMacroList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
