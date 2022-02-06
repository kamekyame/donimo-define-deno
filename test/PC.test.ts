import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[PC] Invalid PC",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><InstrumentList>
    <Map Name="test-map">
      <PC Name="piano" PC="0">
        <Bank Name="piano"/>
      </PC>
    </Map>
    </InstrumentList></ModuleData>`;
    const file = Domino.File.fromXML(fileStr);
    assertThrows(() => {
      file.toXML();
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[PC] Invalid Name",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><InstrumentList>
    <Map Name="test-map">
      <PC Name="0" PC="0">
        <Bank Name="piano"/>
      </PC>
    </Map>
    </InstrumentList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[PC] Invalid Name",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><InstrumentList>
    <Map Name="test-map">
      <PC Name="piano" PC="aaa">
        <Bank Name="piano"/>
      </PC>
    </Map>
    </InstrumentList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[PC] Not found Bank",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><InstrumentList>
    <Map Name="test-map">
      <PC Name="piano" PC="0"></PC>
    </Map>
    </InstrumentList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
