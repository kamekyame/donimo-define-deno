# Domino Define for Deno

[![codecov](https://codecov.io/gh/kamekyame/donimo-define-deno/branch/main/graph/badge.svg?token=AGDKBIOAUW)](https://codecov.io/gh/kamekyame/donimo-define-deno)

MIDI音源編集ソフト「[Domino](https://takabosoft.com/domino)」の音源定義ファイルを作成するためのTypeScriptクラス（for
[Deno](https://deno.land/)）です。

## 使用方法

### `toXML`（tsクラス -> XML）

TypeScript ファイル

```typescript
import * as Domino from "../mod.ts";

const instrumentPcs = [
  new Domino.InstrumentPC("Piano", 1, [
    new Domino.Bank("GrandPiano"),
    new Domino.Bank("BrightPiano"),
  ]),
  new Domino.InstrumentPC("Guitar", 2, [new Domino.Bank("AcousticGuitar")]),
];
const instrumentMaps = [new Domino.InstrumentMap("Map", instrumentPcs)];
const instrumentList = new Domino.InstrumentList(instrumentMaps);

const file = new Domino.File({ name: "sample" }, { instrumentList });
const str = file.toXML();

await Deno.writeTextFile("./example/example.xml", str);
```

出力XML（[example/example.xml](./example/example.xml)）

```xml
<?xml version="1.0" encoding="Shift_JIS"?>
<ModuleData Name="sample">
  <InstrumentList>
    <Map Name="Map">
      <PC Name="Piano" PC="1">
        <Bank Name="GrandPiano"/>
        <Bank Name="BrightPiano"/>
      </PC>
      <PC Name="Guitar" PC="2">
        <Bank Name="AcousticGuitar"/>
      </PC>
    </Map>
  </InstrumentList>
</ModuleData>
```

### `fromXML`（XML -> tsクラス）

```typescript
import * as Domino from "../mod.ts";

const str = await Deno.readTextFile("./example/example.xml");

const file = Domino.File.fromXML(str);
console.log(file);

// console output
// File {
//   xmlVersion: "1.0",
//   xmlEncoding: "Shift_JIS",
//   moduleData: ModuleData {
//     name: "sample",
//     folder: undefined,
//     priority: undefined,
//     fileCreator: undefined,
//     fileVersion: undefined,
//     website: undefined,
//     instrumentList: InstrumentList { maps: [ [Object] ] },
//     drumSetList: undefined,
//     controlChangeMacroList: undefined,
//     templateList: undefined
//   }
// }
```

## 対応タグ

以下のタグに対応しています。

- [x] XMLヘッダ
- [x] ModuleData
  - [x] InstrumentList
    - [x] Map
      - [x] PC
        - [x] Bank
  - [x] DrumSetList
    - [x] Map
      - [x] PC
        - [x] Bank
          - [x] Tone
  - [x] ControlChangeMacroList
    - [x] Folder
    - [x] FolderLink
    - [x] CCM
      - [x] Value,Gate
        - [x] Entry
      - [x] Memo
      - [x] Data
    - [x] CCMLink
    - [x] Table
      - [x] Entry
  - [x] TemplateList
    - [x] Folder
    - [x] Template
      - [ ] Memo
      - [x] CC
      - [ ] PC
      - [ ] Comment
  - [ ] DefaultData
    - [ ] Mark
    - [ ] Track
      - [ ] CC
      - [ ] PC
      - [ ] Comment
      - [ ] Template
      - [ ] EOT

## XMLスキーム

[音源定義ファイルの仕様 - TAKABO SOFT NETWORK](http://5.pro.tok2.com/~mpc/ranzan86/domino/Domino129/Manual/module.htm)
