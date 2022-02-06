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
