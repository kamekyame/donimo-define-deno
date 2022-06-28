// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[EOT] Normal",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData>
    <Track>
    <EOT/>
    </Track>
  </DefaultData></ModuleData>`;

    const file = Domino.File.fromXML(fileStr);
    file.toXML();
  },
});

Deno.test({
  name: "[EOT] Invalid Tick",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><DefaultData>
    <Track>
    <EOT Tick="dummy"/>
    </Track>
  </DefaultData></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
