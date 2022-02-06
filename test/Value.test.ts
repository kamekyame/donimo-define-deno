import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[Value] Invalid Entry ID",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <CCM ID="1" Name="test-ccm" Color="#ff0000" Sync="Last">
      <Value Default="0" Min="100" Max="127" Offset="0" Name="test-value" Type="Key" TableID="0">
        <Entry Label="test-entry" Value="0"/>
      </Value>
    </CCM>
  </ControlChangeMacroList></ModuleData>`;

    const file = Domino.File.fromXML(fileStr);
    assertThrows(() => {
      file.toXML();
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Value] Invalid Default",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <CCM ID="1" Name="test-ccm" Color="#ff0000" Sync="Last">
      <Value Default="aaa"></Value>
    </CCM>
  </ControlChangeMacroList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Value] Invalid Min",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <CCM ID="1" Name="test-ccm" Color="#ff0000" Sync="Last">
      <Value Min="aaa"></Value>
    </CCM>
  </ControlChangeMacroList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Value] Invalid Max",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <CCM ID="1" Name="test-ccm" Color="#ff0000" Sync="Last">
      <Value Max="aaa"></Value>
    </CCM>
  </ControlChangeMacroList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Value] Invalid Offset",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <CCM ID="1" Name="test-ccm" Color="#ff0000" Sync="Last">
      <Value Offset="aaa"></Value>
    </CCM>
  </ControlChangeMacroList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Value] Invalid Type",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <CCM ID="1" Name="test-ccm" Color="#ff0000" Sync="Last">
      <Value Type="aaa"></Value>
    </CCM>
  </ControlChangeMacroList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Value] Invalid TableID",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <CCM ID="1" Name="test-ccm" Color="#ff0000" Sync="Last">
      <Value TableID="aaa"></Value>
    </CCM>
  </ControlChangeMacroList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
