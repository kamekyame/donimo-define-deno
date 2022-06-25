// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[DefaultData Comment] Invalid Tick",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData>
    <Track>
    <Comment Tick="dummy"/>
    </Track>
  </DefaultData></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[DefaultData Comment] Invalid Step",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData>
    <Track>
    <Comment Step="dummy"/>
    </Track>
  </DefaultData></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
