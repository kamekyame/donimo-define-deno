// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[DefaultDataTrackMark] Normal",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData><Track Mode="Conductor">
    <Mark />
  </Track></DefaultData></ModuleData>`;

    const f = Domino.File.fromXML(fileStr);
    f.toXML();
  },
});

Deno.test({
  name: "[DefaultDataTrackMark] Normal",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData><Track Mode="Conductor">
    <Mark Name="123" />
  </Track></DefaultData></ModuleData>`;

    const f = Domino.File.fromXML(fileStr);
    f.toXML();
  },
});

Deno.test({
  name: "[DefaultDataTrackMark] Invalid Tick",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData><Track Mode="Conductor">
    <Mark Mark="4/4" Tick="dummy" />
  </Track></DefaultData></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[DefaultDataTrackMark] Invalid Step",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData><Track Mode="Conductor">
    <Mark Mark="4/4" Step="dummy" />
  </Track></DefaultData></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
