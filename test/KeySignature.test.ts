// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[KeySignature] Normal",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData><Track Mode="Conductor">
    <KeySignature KeySignature="C Maj" />
  </Track></DefaultData></ModuleData>`;

    const f = Domino.File.fromXML(fileStr);
    f.toXML();
  },
});

Deno.test({
  name: "[KeySignature] Invalid KeySignature type",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData><Track Mode="Conductor">
    <KeySignature KeySignature="4" />
  </Track></DefaultData></ModuleData>`;
    assertThrows(() => {
      const f = Domino.File.fromXML(fileStr);
      console.log(f);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[KeySignature] Invalid Tick",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData><Track Mode="Conductor">
    <KeySignature KeySignature="4/4" Tick="dummy" />
  </Track></DefaultData></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[KeySignature] Invalid Step",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData><Track Mode="Conductor">
    <KeySignature KeySignature="4/4" Step="dummy" />
  </Track></DefaultData></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
