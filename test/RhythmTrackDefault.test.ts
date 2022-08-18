// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertNotEquals, assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[RhythmTrackDefault] Normal",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
      <ModuleData Name="test">
      <RhythmTrackDefault Gate="1" />
    </ModuleData>`;

    const f = Domino.File.fromXML(fileStr);
    f.toXML();

    assertNotEquals(f.moduleData.tags.rhythmTrackDefault, undefined);
  },
});

Deno.test({
  name: "[RhythmTrackDefault] Invalid Gate",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test">
    <RhythmTrackDefault Gate="dummy" />
  </ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
