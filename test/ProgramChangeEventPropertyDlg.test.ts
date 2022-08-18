// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertNotEquals, assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[ProgramChangeEventPropertyDlg] Normal",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
      <ModuleData Name="test">
      <ProgramChangeEventPropertyDlg AutoPreviewDelay="0" />
    </ModuleData>`;

    const f = Domino.File.fromXML(fileStr);
    f.toXML();

    assertNotEquals(
      f.moduleData.tags.find((tag) =>
        tag instanceof Domino.ProgramChangeEventPropertyDlg
      ),
      undefined,
    );
  },
});

Deno.test({
  name: "[ProgramChangeEventPropertyDlg] Invalid AutoPreviewDelay",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test">
    <ProgramChangeEventPropertyDlg AutoPreviewDelay="dummy" />
  </ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
