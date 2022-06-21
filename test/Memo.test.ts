// Copyright 2022 kamekyame. All rights reserved. MIT license.

import * as Domino from "../mod.ts";

Deno.test({
  name: "[Memo] Template Memo Normal",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><TemplateList>
    <Template Name="test-template">
    <Memo>メモ</Memo>
    </Template>
  </TemplateList></ModuleData>`;
    const file = Domino.File.fromXML(fileStr);
    file.toXML();
  },
});
