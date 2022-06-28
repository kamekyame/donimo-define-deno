// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[Track] Normal",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData>
    <Track Mode="Conductor"/>
  </DefaultData></ModuleData>`;

    Domino.File.fromXML(fileStr);
  },
});

Deno.test({
  name: "[Track] Normal",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData>
    <Track Mode="Rhythm"/>
  </DefaultData></ModuleData>`;

    Domino.File.fromXML(fileStr);
  },
});

Deno.test({
  name: "[Track] Invalid Ch",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData>
    <Track Ch="dummy"/>
  </DefaultData></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Track] Invalid Ch(<= 0)",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData>
    <Track Ch="0"/>
  </DefaultData></ModuleData>`;
    const file = Domino.File.fromXML(fileStr);
    assertThrows(() => {
      file.toXML();
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Track] Invalid Ch(> 16)",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData>
    <Track Ch="17"/>
  </DefaultData></ModuleData>`;
    const file = Domino.File.fromXML(fileStr);
    assertThrows(() => {
      file.toXML();
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[Track] Invalid Mode",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData>
    <Track Mode="dummy"/>
  </DefaultData></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
