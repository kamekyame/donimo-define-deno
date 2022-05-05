// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[Tone] Invalid Key",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DrumSetList>
    <Map Name="test-drummap2">
      <PC Name="drum" PC="1">
        <Bank Name="drum2" LSB="0" MSB="0">
          <Tone Name="Bass" Key="1000"/>
        </Bank>
      </PC>
    </Map>
  </DrumSetList></ModuleData>`;

    const file = Domino.File.fromXML(fileStr);
    assertThrows(() => {
      file.toXML();
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Tone] Invalid Name",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DrumSetList>
    <Map Name="test-drummap2">
      <PC Name="drum" PC="1">
        <Bank Name="drum2" LSB="0" MSB="0">
          <Tone Key="0"/>
        </Bank>
      </PC>
    </Map>
  </DrumSetList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Tone] Invalid Key",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DrumSetList>
    <Map Name="test-drummap2">
      <PC Name="drum" PC="1">
        <Bank Name="drum2" LSB="0" MSB="0">
          <Tone Name="Bass" Key="aaa"/>
        </Bank>
      </PC>
    </Map>
  </DrumSetList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
