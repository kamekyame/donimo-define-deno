import { assertThrows } from "../deps.test.ts";
import * as Domino from "../mod.ts";

Deno.test({
  name: "[CCMFolderLink] Invalid Name",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <FolderLink ID="0"/>
  </ControlChangeMacroList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[CCMFolderLink] Invalid ID",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <FolderLink Name="test-folderLink"/>
  </ControlChangeMacroList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[CCMFolderLink] Invalid Value",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <FolderLink Name="test-folderLink" ID="0" Value="aaa"/>
  </ControlChangeMacroList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});

Deno.test({
  name: "[CCMFolderLink] Invalid Gate",
  fn: () => {
    const fileStr = `<?xml version="1.0" encoding="Shift_JIS"?>
    <ModuleData Name="test"><ControlChangeMacroList>
    <FolderLink Name="test-folderLink" ID="0" Gate="aaa"/>
  </ControlChangeMacroList></ModuleData>`;
    assertThrows(() => {
      Domino.File.fromXML(fileStr);
    }, Domino.DominoError);
  },
});
