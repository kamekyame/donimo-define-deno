// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[CC] Invalid ID",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><TemplateList>
    <Template Name="test-template" ID="0">
      <CC ID="aaa"/>
    </Template>
  </TemplateList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[CC] Invalid Value",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><TemplateList>
    <Template Name="test-template" ID="0">
      <CC ID="0" Value="aaa"/>
    </Template>
  </TemplateList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[CC] Invalid Gate",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><TemplateList>
    <Template Name="test-template" ID="0">
      <CC ID="0" Gate="aaa"/>
    </Template>
  </TemplateList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
