// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[Tempo] Normal",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData><Track Mode="Conductor">
    <Tempo Tempo="120.0" />
  </Track></DefaultData></ModuleData>`;

    const f = Domino.File.fromXML(fileStr);
    f.toXML();
  },
});

Deno.test({
  name: "[Tempo] Invalid Tempo type",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData><Track Mode="Conductor">
    <Tempo Tempo="tempo" />
  </Track></DefaultData></ModuleData>`;
    assertThrows(() => {
      const f = Domino.File.fromXML(fileStr);
      console.log(f);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Tempo] Invalid Tick",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData><Track Mode="Conductor">
    <Tempo Tempo="120.0" Tick="dummy" />
  </Track></DefaultData></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Tempo] Invalid Step",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData><Track Mode="Conductor">
    <Tempo Tempo="120.0" Step="dummy" />
  </Track></DefaultData></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
