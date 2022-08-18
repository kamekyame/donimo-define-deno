// Copyright 2022 kamekyame. All rights reserved. MIT license.

import { assertEquals } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[restore] Full XML",
  fn: () => {
    const instrumentPcs = [
      new Domino.InstrumentPC("piano", 1, [new Domino.Bank("piano")]),
      new Domino.InstrumentPC("piano", 2, [new Domino.Bank("piano", 0, 0)]),
    ];
    const instrumentMaps = [
      new Domino.InstrumentMap("test-map"),
      new Domino.InstrumentMap("test-map2", instrumentPcs),
    ];
    const instrumentList = new Domino.InstrumentList(instrumentMaps);

    const tones = [new Domino.Tone("Bass", 1)];
    const drumPcs = [
      new Domino.DrumPC("drum", 1, [new Domino.DrumBank([], "drum")]),
      new Domino.DrumPC("drum", 1, [new Domino.DrumBank(tones, "drum2", 0, 0)]),
    ];
    const drumMaps = [
      new Domino.DrumMap("test-drummap"),
      new Domino.DrumMap("test-drummap2", drumPcs),
    ];
    const drumSetList = new Domino.DrumSetList(drumMaps);

    const entries = [
      new Domino.Entry({ label: "test-entry", value: 0 }),
      new Domino.Entry({ label: "test-entry", value: 1 }),
    ];
    const value = new Domino.Value(
      {
        default: 0,
        min: 0,
        max: 127,
        offset: 0,
        name: "test-value",
        type: "Key",
        tableId: 0,
      },
      entries,
    );
    const gate = new Domino.Gate(
      {
        default: 0,
        min: 0,
        max: 127,
        offset: 0,
        name: "test-value",
        type: "Key",
        tableId: 0,
      },
      entries,
    );
    const data = new Domino.Data("test-data");

    const tags = [
      new Domino.CCMFolder({ name: "test-folder" }),
      new Domino.CCMFolder({ name: "test-folder2", id: 0 }),
      new Domino.CCMFolder({ name: "test-folder3" }, [
        new Domino.CCMFolder({ name: "test-nest-folder" }),
        new Domino.CCMFolderLink({ name: "test-nest-folder-link", id: 0 }),
        new Domino.CCM({ id: 0, name: "test-ccm" }),
        new Domino.CCMLink({ id: 0, value: 0, gate: 0 }),
        new Domino.Table({ id: 0 }, entries),
      ]),
      new Domino.CCMFolderLink({ name: "test-folder-link", id: 0 }),
      new Domino.CCMFolderLink({
        name: "test-folder-link2",
        id: 0,
        value: 0,
        gate: 0,
      }),
      new Domino.CCM({ id: 0, name: "test-ccm" }),
      new Domino.CCM(
        {
          id: 1,
          name: "test-ccm",
          color: "#ff0000",
          sync: "Last",
        },
        [value, gate, "test-memo", data],
      ),
      new Domino.CCMLink({ id: 0 }),
      new Domino.CCMLink({ id: 0, value: 0, gate: 0 }),
      new Domino.Table({ id: 0 }),
      new Domino.Table({ id: 0 }, entries),
    ];

    const controlChangeMacroList = new Domino.ControlChangeMacroList(tags);

    const templateList = new Domino.TemplateList([
      new Domino.TemplateFolder({ name: "test-template-folder" }),
      new Domino.TemplateFolder({ name: "test-template-folder2" }, [
        new Domino.Template({ name: "test-nest-template" }),
      ]),
      new Domino.Template({ name: "test-template" }),
      new Domino.Template({ name: "test-template", id: 0 }, [
        new Domino.CC({ id: 0 }),
        new Domino.CC({ id: 0, value: 0, gate: 0 }),
      ]),
    ]);

    const file = new Domino.File(
      {
        name: "test",
        folder: "test",
        priority: 100,
        fileCreator: "test",
        fileVersion: "test",
        website: "http://example.com",
      },
      [instrumentList, drumSetList, controlChangeMacroList, templateList],
    );
    const str = file.toXML();
    const restoreFile = Domino.File.fromXML(str);
    assertEquals(file, restoreFile);
  },
});

Deno.test({
  name: "[restore] Empty InstrumentList",
  fn: () => {
    const instrumentList = new Domino.InstrumentList();

    const file = new Domino.File({ name: "test" }, [instrumentList]);
    const str = file.toXML();
    const restoreFile = Domino.File.fromXML(str);
    assertEquals(file, restoreFile);
  },
});

Deno.test({
  name: "[restore] InstrumentList has only one Map",
  fn: () => {
    const instrumentMaps = [new Domino.InstrumentMap("test-map")];
    const instrumentList = new Domino.InstrumentList(instrumentMaps);

    const file = new Domino.File({ name: "test" }, [instrumentList]);
    const str = file.toXML();
    const restoreFile = Domino.File.fromXML(str);
    assertEquals(file, restoreFile);
  },
});

Deno.test({
  name: "[restore] InstrumentList Map has only one PC",
  fn: () => {
    const pc = [
      new Domino.InstrumentPC("piano", 1, [new Domino.Bank("piano")]),
    ];
    const instrumentMaps = [new Domino.InstrumentMap("test-map", pc)];
    const instrumentList = new Domino.InstrumentList(instrumentMaps);

    const file = new Domino.File({ name: "test" }, [instrumentList]);
    const str = file.toXML();
    const restoreFile = Domino.File.fromXML(str);
    assertEquals(file, restoreFile);
  },
});

Deno.test({
  name: "[restore] Empty ControlChangeMacroList",
  fn: () => {
    const controlChangeMacroList = new Domino.ControlChangeMacroList();

    const file = new Domino.File({ name: "test" }, [controlChangeMacroList]);
    const str = file.toXML();
    const restoreFile = Domino.File.fromXML(str);
    assertEquals(file, restoreFile);
  },
});

Deno.test({
  name: "[restore] Enpty TemplateList",
  fn: () => {
    const templateList = new Domino.TemplateList();

    const file = new Domino.File({ name: "test" }, [templateList]);
    const str = file.toXML();
    const restoreFile = Domino.File.fromXML(str);
    assertEquals(file, restoreFile);
  },
});
