// Copyright 2022 kamekyame. All rights reserved. MIT license.

import * as Domino from "../mod.ts";

Deno.test({
  name: "[Comment] Text is Number",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><TemplateList>
    <Template Name="test-template">
    <Comment Text="1234" />
    </Template>
  </TemplateList></ModuleData>`;
    const file = Domino.File.fromXML(fileStr);
    file.toXML();
  },
});

Deno.test({
  name: "[Comment] Text is Undefined",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><TemplateList>
    <Template Name="test-template">
    <Comment />
    </Template>
  </TemplateList></ModuleData>`;
    const file = Domino.File.fromXML(fileStr);
    file.toXML();
  },
});
