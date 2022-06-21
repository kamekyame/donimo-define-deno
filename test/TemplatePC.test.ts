// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[TemplatePC] Invalid PC",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><TemplateList>
    <Template Name="test-template">
      <PC PC="0"/>
    </Template>
  </TemplateList></ModuleData>`;
    const file = Domino.File.fromXML(fileStr);

    assertThrows(() => {
      file.toXML();
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[TemplatePC] Invalid MSB",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><TemplateList>
    <Template Name="test-template">
      <PC MSB="dummy"/>
    </Template>
  </TemplateList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[TemplatePC] Invalid LSB",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><TemplateList>
    <Template Name="test-template">
      <PC LSB="dummy"/>
    </Template>
  </TemplateList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[TemplatePC] Invalid Mode",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><TemplateList>
    <Template Name="test-template">
      <PC Mode="dummy"/>
    </Template>
  </TemplateList></ModuleData>`;

    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
