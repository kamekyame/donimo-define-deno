import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[Bank] Invalid LSB",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><InstrumentList>
    <Map Name="test-map">
      <PC Name="piano" PC="1">
        <Bank Name="piano" LSB="1000" />
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
  name: "[Bank] Invalid MSB",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><InstrumentList>
    <Map Name="test-map">
      <PC Name="piano" PC="1">
        <Bank Name="piano" MSB="1000" />
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
  name: "[Bank] Invalid Name",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><InstrumentList>
    <Map Name="test-map">
      <PC Name="piano" PC="1">
        <Bank Dummy="aaa"/>
      </PC>
    </Map>
    </InstrumentList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Bank] Invalid LSB",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><InstrumentList>
    <Map Name="test-map">
      <PC Name="piano" PC="1">
        <Bank Name="piano" LSB="aaa"/>
      </PC>
    </Map>
    </InstrumentList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Bank] Invalid MSB",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><InstrumentList>
    <Map Name="test-map">
      <PC Name="piano" PC="1">
        <Bank Name="piano" MSB="aaa"/>
      </PC>
    </Map>
    </InstrumentList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
