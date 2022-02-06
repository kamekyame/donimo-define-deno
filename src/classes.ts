import { node, parse, stringify, unode } from "../deps.ts";
import { DominoError } from "./util.ts";

function isNode(a: unknown): a is node {
  return a !== null && typeof a === "object";
}

function nodeToArray(node: node) {
  if (Array.isArray(node)) return node as node[];
  else return [node];
}

export class File {
  public readonly xmlVersion = "1.0";
  public readonly xmlEncoding = "Shift_JIS";

  public moduleData: ModuleData;

  constructor(...moduleDataParam: ConstructorParameters<typeof ModuleData>) {
    this.moduleData = new ModuleData(...moduleDataParam);
  }

  toXML() {
    const doc = {
      xml: {
        "@version": this.xmlVersion,
        "@encoding": this.xmlEncoding,
      },
      ModuleData: this.moduleData.toXMLNode(),
    };
    const str = stringify(doc);
    return str;
  }

  static fromXML(xml: string) {
    const doc = parse(xml);
    if (!isNode(doc.xml)) throw new DominoError("Invalid XML");
    if (doc.xml["@encoding"] !== "Shift_JIS") {
      throw new DominoError("Invalid encoding");
    }
    if (!doc.ModuleData || !isNode(doc.ModuleData)) {
      throw new DominoError("Invalid XML: Not found ModuleData");
    }
    const {
      name,
      folder,
      priority,
      fileCreator,
      fileVersion,
      website,
      instrumentList,
      drumSetList,
      controlChangeMacroList,
      templateList,
    } = ModuleData.fromXMLNode(doc.ModuleData);
    const file = new File(
      {
        name,
        folder,
        priority,
        fileCreator,
        fileVersion,
        website,
      },
      { instrumentList, drumSetList, controlChangeMacroList, templateList },
    );
    return file;
  }
}

export class ModuleData implements Base {
  public name: string;
  public folder?: string;
  public priority?: number;
  public fileCreator?: string;
  public fileVersion?: string;
  public website?: string;

  public instrumentList?: InstrumentList;
  public drumSetList?: DrumSetList;
  public controlChangeMacroList?: ControlChangeMacroList;
  public templateList?: TemplateList;

  constructor(
    {
      name,
      folder,
      priority,
      fileCreator,
      fileVersion,
      website,
    }: {
      name: string;
      folder?: string;
      priority?: number;
      fileCreator?: string;
      fileVersion?: string;
      website?: string;
    },
    {
      instrumentList,
      drumSetList,
      controlChangeMacroList,
      templateList,
    }: {
      instrumentList?: InstrumentList;
      drumSetList?: DrumSetList;
      controlChangeMacroList?: ControlChangeMacroList;
      templateList?: TemplateList;
    } = {},
  ) {
    this.name = name;
    this.folder = folder;
    this.priority = priority;
    this.fileCreator = fileCreator;
    this.fileVersion = fileVersion;
    this.website = website;

    this.instrumentList = instrumentList;
    this.drumSetList = drumSetList;
    this.controlChangeMacroList = controlChangeMacroList;
    this.templateList = templateList;
  }

  check() {}

  toXMLNode() {
    this.check();
    const node: unode = {
      "@Name": this.name,
    };

    if (this.folder !== undefined) node["@Folder"] = this.folder;
    if (this.priority !== undefined) node["@Priority"] = this.priority;
    if (this.fileCreator !== undefined) node["@FileCreator"] = this.fileCreator;
    if (this.fileVersion !== undefined) node["@FileVersion"] = this.fileVersion;
    if (this.website !== undefined) node["@WebSite"] = this.website;

    if (this.instrumentList !== undefined) {
      node.InstrumentList = this.instrumentList.toXMLNode();
    }
    if (this.drumSetList) node.DrumSetList = this.drumSetList.toXMLNode();
    if (this.controlChangeMacroList) {
      node.ControlChangeMacroList = this.controlChangeMacroList.toXMLNode();
    }
    if (this.templateList) node.TemplateList = this.templateList.toXMLNode();

    return node;
  }

  static fromXMLNode(node: node) {
    const {
      "@Name": name,
      "@Folder": folder,
      "@Priority": priority,
      "@FileCreator": fileCreator,
      "@FileVersion": fileVersion,
      "@WebSite": website,
      InstrumentList: instrumentList_,
      DrumSetList: drumSetList_,
      ControlChangeMacroList: controlChangeMacroList_,
      TemplateList: templateList_,
    } = node;

    if (name === undefined) {
      throw new DominoError("Invalid XML: Not found ModuleData Name");
    }
    const param: ConstructorParameters<typeof this>[0] = { name: String(name) };

    if (folder !== undefined) param.folder = String(folder);
    if (priority !== undefined) {
      if (typeof priority !== "number") {
        throw new DominoError("Invalid XML: Not found ModuleData Priority");
      } else param.priority = priority;
    }
    if (fileCreator !== undefined) param.fileCreator = String(fileCreator);
    if (fileVersion !== undefined) param.fileVersion = String(fileVersion);
    if (website !== undefined) param.website = String(website);

    let instrumentList;
    if (instrumentList_ === null || isNode(instrumentList_)) {
      instrumentList = InstrumentList.fromXMLNode(instrumentList_);
    }
    let drumSetList;
    if (drumSetList_ === null || isNode(drumSetList_)) {
      drumSetList = DrumSetList.fromXMLNode(drumSetList_);
    }
    let controlChangeMacroList;
    if (controlChangeMacroList_ === null || isNode(controlChangeMacroList_)) {
      controlChangeMacroList = ControlChangeMacroList.fromXMLNode(
        controlChangeMacroList_,
      );
    }
    let templateList;
    if (templateList_ === null || isNode(templateList_)) {
      templateList = TemplateList.fromXMLNode(templateList_);
    }

    const moduleData = new ModuleData(param, {
      instrumentList,
      drumSetList,
      controlChangeMacroList,
      templateList,
    });
    return moduleData;
  }
}

export class MapList<T extends InstrumentMap | DrumMap> {
  public maps: T[];

  constructor(maps?: T[]) {
    this.maps = maps || [];
  }

  check() {}

  toXMLNode() {
    this.check();
    const node: unode = {};
    if (this.maps.length > 0) {
      node.Map = this.maps.map((map) => map.toXMLNode());
    }
    return node;
  }

  protected static fromXMLNodeBase(node: node | null) {
    let mapNodes = [];
    if (node) {
      const { Map: map_ } = node;
      if (Array.isArray(map_)) mapNodes = map_;
      else mapNodes = [map_];
    }
    return { mapNodes };
  }
}

export class InstrumentList extends MapList<InstrumentMap> implements Base {
  static fromXMLNode(node: node | null) {
    const { mapNodes } = this.fromXMLNodeBase(node);
    const maps = mapNodes.map((mapNode) => InstrumentMap.fromXMLNode(mapNode));
    const instrumentList = new this(maps);
    return instrumentList;
  }
}

export class DrumSetList extends MapList<DrumMap> implements Base {
  static fromXMLNode(node: node | null) {
    const { mapNodes } = this.fromXMLNodeBase(node);
    const maps = mapNodes.map((mapNode) => DrumMap.fromXMLNode(mapNode));
    const instrumentList = new this(maps);
    return instrumentList;
  }
}

export class ControlChangeMacroList implements Base {
  public tags: (CCMFolder | CCMFolderLink | CCM | CCMLink | Table)[];

  constructor(tags?: typeof ControlChangeMacroList.prototype.tags) {
    this.tags = tags || [];
  }

  check() {}

  toXMLNode() {
    this.check();
    const node: unode = {
      Folder: this.tags.flatMap((tags) => {
        if (tags instanceof CCMFolder) return [tags.toXMLNode()];
        else return [];
      }),
      FolderLink: this.tags.flatMap((tags) => {
        if (tags instanceof CCMFolderLink) return [tags.toXMLNode()];
        else return [];
      }),
      CCM: this.tags.flatMap((tags) => {
        if (tags instanceof CCM) return [tags.toXMLNode()];
        else return [];
      }),
      CCMLink: this.tags.flatMap((tags) => {
        if (tags instanceof CCMLink) return [tags.toXMLNode()];
        else return [];
      }),
      Table: this.tags.flatMap((tags) => {
        if (tags instanceof Table) return [tags.toXMLNode()];
        else return [];
      }),
      //ControlChangeMacro: null, //this.tags.map((tag) => tag.toXMLNode()),
    };
    return node;
  }

  static fromXMLNode(node: node | null) {
    const tags: ControlChangeMacroList["tags"] = [];
    if (node) {
      const {
        Folder: folders_,
        FolderLink: folderLinks_,
        CCM: ccms_,
        CCMLink: ccmlinks_,
        Table: tables_,
      } = node;
      if (isNode(folders_)) {
        nodeToArray(folders_).forEach((folderNode) => {
          tags.push(CCMFolder.fromXMLNode(folderNode));
        });
      }
      if (isNode(folderLinks_)) {
        nodeToArray(folderLinks_).forEach((folderLinkNode) => {
          tags.push(CCMFolderLink.fromXMLNode(folderLinkNode));
        });
      }
      if (isNode(ccms_)) {
        nodeToArray(ccms_).forEach((ccmNode) => {
          tags.push(CCM.fromXMLNode(ccmNode));
        });
      }
      if (isNode(ccmlinks_)) {
        nodeToArray(ccmlinks_).forEach((ccmlinkNode) => {
          tags.push(CCMLink.fromXMLNode(ccmlinkNode));
        });
      }
      if (isNode(tables_)) {
        nodeToArray(tables_).forEach((tableNode) => {
          tags.push(Table.fromXMLNode(tableNode));
        });
      }
    }
    const controlChangeMacroList = new this(tags);
    return controlChangeMacroList;
  }
}

export class TemplateList implements Base {
  public tags: (TemplateFolder | Template)[];

  constructor(tags?: typeof TemplateList.prototype.tags) {
    this.tags = tags || [];
  }

  check() {}

  toXMLNode() {
    this.check();
    const node: unode = {
      Folder: this.tags.flatMap((tags) => {
        if (tags instanceof TemplateFolder) return [tags.toXMLNode()];
        else return [];
      }),
      Template: this.tags.flatMap((tags) => {
        if (tags instanceof Template) return [tags.toXMLNode()];
        else return [];
      }),
    };

    return node;
  }

  static fromXMLNode(node: node | null) {
    const tags: TemplateList["tags"] = [];
    if (node) {
      const { Folder: folders_, Template: templates_ } = node;
      if (isNode(folders_)) {
        nodeToArray(folders_).forEach((folderNode) => {
          tags.push(TemplateFolder.fromXMLNode(folderNode));
        });
      }
      if (isNode(templates_)) {
        nodeToArray(templates_).forEach((templateNode) => {
          tags.push(Template.fromXMLNode(templateNode));
        });
      }
    }
    const templateList = new this(tags);
    return templateList;
  }
}

class Map<T extends Bank> {
  public readonly name: string;
  public pcs: PC<T>[];
  constructor(name: string, pcs?: PC<T>[]) {
    this.name = name;
    this.pcs = pcs || [];
  }

  check() {}

  toXMLNode() {
    this.check();
    const node: unode = {
      "@Name": this.name,
      PC: this.pcs.map((pc) => pc.toXMLNode()),
    };
    return node;
  }

  protected static fromXMLNodeBase(node: node) {
    const { "@Name": name, PC: pc_ } = node;

    if (name === undefined) {
      throw new DominoError("Invalid XML: Not Found Map Name");
    }

    let pcNodes = [];
    if (pc_) {
      if (Array.isArray(pc_)) pcNodes = pc_;
      else pcNodes = [pc_];
    }
    return { name: String(name), pcNodes };
  }
}

export class InstrumentMap extends Map<Bank> implements Base {
  static fromXMLNode(node: node) {
    const { name, pcNodes } = this.fromXMLNodeBase(node);
    const pcs = pcNodes.map((pcNode) => InstrumentPC.fromXMLNode(pcNode));
    const map = new this(name, pcs);
    return map;
  }
}
export class DrumMap extends Map<DrumBank> implements Base {
  static fromXMLNode(node: node) {
    const { name, pcNodes } = this.fromXMLNodeBase(node);
    const pcs = pcNodes.map((pcNode) => DrumPC.fromXMLNode(pcNode));
    const map = new this(name, pcs);
    return map;
  }
}

class PC<T extends Bank> {
  public readonly name: string;
  public readonly pc: number;
  public banks: T[];

  constructor(name: string, pc: number, banks: [T, ...T[]]) {
    this.name = name;
    this.pc = pc;
    this.banks = banks;
  }

  check() {
    if (this.pc < 1 || this.pc > 128) {
      throw new DominoError(
        `PC must be between 1 and 128. Received: ${this.pc},${this.name}`,
      );
    }
  }

  toXMLNode() {
    this.check();
    const node: unode = {
      "@Name": this.name,
      "@PC": this.pc,
      Bank: this.banks.map((bank) => bank.toXMLNode()),
    };

    return node;
  }

  protected static fromXMLNodeBase(node: node) {
    const { "@Name": name, "@PC": pc, Bank: bank_ } = node;

    if (name === undefined) {
      throw new DominoError("Invalid XML: Not Found PC Name");
    }
    if (typeof pc !== "number") {
      throw new DominoError("Invalid XML: Not found PC");
    }

    let bankNodes;
    if (Array.isArray(bank_)) bankNodes = bank_;
    else if (bank_) bankNodes = [bank_];
    if (bankNodes === undefined) {
      throw new DominoError("Invalid XML: Not found Bank");
    }

    return { name: String(name), pc, bankNodes };
  }
}

export class InstrumentPC extends PC<Bank> implements Base {
  static fromXMLNode(node: node) {
    const { name, pc, bankNodes } = this.fromXMLNodeBase(node);
    const banks = bankNodes.map((bank) => Bank.fromXMLNode(bank)) as [
      Bank,
      ...Bank[],
    ];

    const pc_ = new this(name, pc, banks);
    return pc_;
  }
}
export class DrumPC extends PC<DrumBank> implements Base {
  static fromXMLNode(node: node) {
    const { name, pc, bankNodes } = this.fromXMLNodeBase(node);
    const banks = bankNodes.map((bank) => DrumBank.fromXMLNode(bank)) as [
      DrumBank,
      ...DrumBank[],
    ];

    const pc_ = new this(name, pc, banks);
    return pc_;
  }
}

export class Bank implements Base {
  public name: string;
  protected lsb?: number;
  protected msb?: number;

  constructor(name: string, lsb?: number, msb?: number) {
    this.name = name;
    this.lsb = lsb;
    this.msb = msb;
  }

  check() {
    if (this.lsb !== undefined) {
      if (this.lsb < 0 || this.lsb > 255) {
        throw new DominoError(
          `LSB must be between 0 and 255. Received: ${this.lsb}`,
        );
      }
    }
    if (this.msb !== undefined) {
      if (this.msb < 0 || this.msb > 255) {
        throw new DominoError(
          `MSB must be between 0 and 255. Received: ${this.msb}`,
        );
      }
    }
  }

  toXMLNode() {
    this.check();
    const node: unode = {
      "@Name": this.name,
    };
    if (this.lsb !== undefined) node["@LSB"] = this.lsb;
    if (this.msb !== undefined) node["@MSB"] = this.msb;
    return node;
  }

  protected static fromXMLNodeBase(node: node) {
    const { "@Name": name, "@LSB": lsb, "@MSB": msb } = node;

    if (name === undefined) {
      throw new DominoError("Invalid XML: Not found Name");
    }

    if (lsb !== undefined && typeof lsb !== "number") {
      throw new DominoError("Invalid XML: Not found Bank LSB");
    }

    if (msb !== undefined && typeof msb !== "number") {
      throw new DominoError("Invalid XML: Not found Bank MSB");
    }

    return { name: String(name), lsb, msb };
  }

  static fromXMLNode(node: node) {
    const { name, lsb, msb } = this.fromXMLNodeBase(node);
    const bank = new Bank(name, lsb, msb);
    return bank;
  }
}
export class DrumBank extends Bank {
  public tones: Tone[];

  constructor(
    tones?: Tone[],
    ...bankConstructorParameters: ConstructorParameters<typeof Bank>
  ) {
    super(...bankConstructorParameters);
    this.tones = tones || [];
  }

  toXMLNode() {
    this.check();
    const node = super.toXMLNode();
    if (this.tones.length > 0) {
      node.Tone = this.tones.map((tone) => tone.toXMLNode());
    }
    return node;
  }

  static fromXMLNode(node: node) {
    const { name, lsb, msb } = this.fromXMLNodeBase(node);
    const { Tone: tone_ } = node;

    let toneNodes;
    if (Array.isArray(tone_)) toneNodes = tone_;
    else if (tone_ !== undefined) toneNodes = [tone_];

    const tone = toneNodes?.map((tone) => Tone.fromXMLNode(tone));

    const bank = new this(tone, name, lsb, msb);
    return bank;
  }
}

export class Tone implements Base {
  public name: string;
  public key: number;

  constructor(name: string, key: number) {
    this.name = name;
    this.key = key;
  }

  check() {
    if (this.key < 0 || this.key > 127) {
      throw new DominoError(
        `Key must be between 0 and 127. Received: ${this.key}`,
      );
    }
  }

  toXMLNode() {
    this.check();
    const node: unode = {
      "@Name": this.name,
      "@Key": this.key,
    };
    return node;
  }

  static fromXMLNode(node: node) {
    const { "@Name": name, "@Key": key } = node;

    if (name === undefined) {
      throw new DominoError("Invalid XML: Not found Tone Name");
    }
    if (typeof key !== "number") {
      throw new DominoError("Invalid XML: Not found Tone Key");
    }

    const tone = new this(String(name), key);
    return tone;
  }
}

export class CCMFolder implements Base {
  public param: {
    name: string;
    id?: number;
  };
  public tags: (CCMFolder | CCMFolderLink | CCM | CCMLink | Table)[];

  constructor(
    param: typeof CCMFolder.prototype.param,
    tags?: typeof CCMFolder.prototype.tags,
  ) {
    this.param = param;
    this.tags = tags || [];
  }

  check() {}

  toXMLNode() {
    this.check();
    const node: unode = {
      "@Name": this.param.name,
      Folder: this.tags.flatMap((tags) => {
        if (tags instanceof CCMFolder) return [tags.toXMLNode()];
        else return [];
      }),
      FolderLink: this.tags.flatMap((tags) => {
        if (tags instanceof CCMFolderLink) return [tags.toXMLNode()];
        else return [];
      }),
      CCM: this.tags.flatMap((tags) => {
        if (tags instanceof CCM) return [tags.toXMLNode()];
        else return [];
      }),
      CCMLink: this.tags.flatMap((tags) => {
        if (tags instanceof CCMLink) return [tags.toXMLNode()];
        else return [];
      }),
      Table: this.tags.flatMap((tags) => {
        if (tags instanceof Table) return [tags.toXMLNode()];
        else return [];
      }),
    };
    if (this.param.id !== undefined) node["@ID"] = this.param.id;

    return node;
  }

  static fromXMLNode(node: node) {
    const {
      "@Name": name,
      "@ID": id,
      Folder: folders_,
      FolderLink: folderLinks_,
      CCM: ccms_,
      CCMLink: ccmlinks_,
      Table: tables_,
    } = node;
    if (name === undefined) {
      throw new DominoError("Invalid XML: Not found Folder Name");
    }
    const param: ConstructorParameters<typeof CCMFolder>[0] = {
      name: String(name),
    };
    if (id !== undefined) {
      if (typeof id !== "number") {
        throw new DominoError("Invalid XML: Not found Folder ID");
      } else param.id = id;
    }

    const tags: ConstructorParameters<typeof this>[1] = [];

    if (isNode(folders_)) {
      nodeToArray(folders_).forEach((folderNode) => {
        tags.push(CCMFolder.fromXMLNode(folderNode));
      });
    }
    if (isNode(folderLinks_)) {
      nodeToArray(folderLinks_).forEach((folderLinkNode) => {
        tags.push(CCMFolderLink.fromXMLNode(folderLinkNode));
      });
    }
    if (isNode(ccms_)) {
      nodeToArray(ccms_).forEach((ccmNode) => {
        tags.push(CCM.fromXMLNode(ccmNode));
      });
    }
    if (isNode(ccmlinks_)) {
      nodeToArray(ccmlinks_).forEach((ccmLinkNode) => {
        tags.push(CCMLink.fromXMLNode(ccmLinkNode));
      });
    }
    if (isNode(tables_)) {
      nodeToArray(tables_).forEach((tableNode) => {
        tags.push(Table.fromXMLNode(tableNode));
      });
    }

    const folder = new this(param, tags);
    return folder;
  }
}

export class CCMFolderLink implements Base {
  public param: {
    name: string;
    id: number;
    value?: number;
    gate?: number;
  };

  constructor(
    param: typeof CCMFolderLink.prototype.param,
  ) {
    this.param = param;
  }

  check() {}

  toXMLNode() {
    this.check();
    const node: unode = {
      "@Name": this.param.name,
      "@ID": this.param.id,
    };
    if (this.param.value !== undefined) node["@Value"] = this.param.value;
    if (this.param.gate !== undefined) node["@Gate"] = this.param.gate;

    return node;
  }

  static fromXMLNode(node: node) {
    const { "@Name": name, "@ID": id, "@Value": value, "@Gate": gate } = node;

    if (name === undefined) {
      throw new DominoError("Invalid XML: Not found FolderLink Name");
    }
    if (id === undefined || typeof id !== "number") {
      throw new DominoError("Invalid XML: Not found FolderLink ID");
    }
    const param: ConstructorParameters<typeof CCMFolderLink>[0] = {
      name: String(name),
      id,
    };
    if (value !== undefined) {
      if (typeof value !== "number") {
        throw new DominoError("Invalid XML: Not found FolderLink Value");
      } else param.value = value;
    }
    if (gate !== undefined) {
      if (typeof gate !== "number") {
        throw new DominoError("Invalid XML: Not found FolderLink Gate");
      } else param.gate = gate;
    }

    const folderLink = new this(param);
    return folderLink;
  }
}

export class CCM implements Base {
  public param: {
    id: number;
    name: string;
    color?: string;
    sync?: "Last" | "LastEachGate";
  };

  public value?: Value;
  public gate?: Gate;
  public data?: Data;
  public memo?: string;

  constructor(
    param: typeof CCM.prototype.param,
    {
      value,
      gate,
      data,
      memo,
    }: {
      value?: Value;
      gate?: Gate;
      data?: Data;
      memo?: string;
    } = {},
  ) {
    this.param = param;

    this.value = value;
    this.gate = gate;
    this.data = data;
    this.memo = memo;
  }
  check() {
    if (this.param.id < 0 || this.param.id > 1300) {
      throw new DominoError(
        `CCM ID must be between 0 and 1300. Received: ${this.param.id}`,
      );
    }
    if (this.param.color?.startsWith("#") === false) {
      throw new DominoError(
        `CCM Color must start with #. Received: ${this.param.color}`,
      );
    }
  }

  toXMLNode() {
    this.check();
    const node: unode = {
      "@ID": this.param.id,
      "@Name": this.param.name,
    };
    if (this.param.color !== undefined) node["@Color"] = this.param.color;
    if (this.param.sync !== undefined) node["@Sync"] = this.param.sync;

    if (this.value !== undefined) node.Value = this.value.toXMLNode();
    if (this.gate !== undefined) node.Gate = this.gate.toXMLNode();
    if (this.data !== undefined) node.Data = this.data.toXMLNode();
    if (this.memo !== undefined) node.Memo = this.memo;

    return node;
  }

  static fromXMLNode(node: node) {
    const {
      "@ID": id,
      "@Name": name,
      "@Color": color,
      "@Sync": sync,
      Value: value_,
      Gate: gate_,
      Memo: memo,
      Data: data_,
    } = node;

    if (typeof id !== "number") {
      throw new DominoError("Invalid XML: Not found CCM ID");
    }
    if (name === undefined) {
      throw new DominoError("Invalid XML: Not found CCM Name");
    }
    const param: ConstructorParameters<typeof this>[0] = {
      id,
      name: String(name),
    };

    if (color !== undefined) {
      if (typeof color !== "string") {
        throw new DominoError("Invalid XML: Not found CCM Color");
      } else param.color = color;
    }
    if (sync !== undefined) {
      if (sync !== "Last" && sync !== "LastEachGate") {
        throw new DominoError("Invalid XML: Not found CCM Sync");
      } else param.sync = sync;
    }

    const tags: ConstructorParameters<typeof this>[1] = {};
    if (value_ !== undefined && isNode(value_)) {
      tags.value = Value.fromXMLNode(value_);
    }
    if (gate_ !== undefined && isNode(gate_)) {
      tags.gate = Gate.fromXMLNode(gate_);
    }
    if (memo !== undefined && typeof memo === "string") tags.memo = memo;
    if (data_ !== undefined && typeof data_ === "string") {
      tags.data = Data.fromXMLNode(data_);
    }

    const ccm = new this(param, tags);
    return ccm;
  }
}

export class CCMLink implements Base {
  public param: {
    id: number;
    value?: number;
    gate?: number;
  };

  constructor(
    param: typeof CCMLink.prototype.param,
  ) {
    this.param = param;
  }

  check() {}

  toXMLNode() {
    this.check();
    const node: unode = {
      "@ID": this.param.id,
    };
    if (this.param.value !== undefined) node["@Value"] = this.param.value;
    if (this.param.gate !== undefined) node["@Gate"] = this.param.gate;

    return node;
  }

  static fromXMLNode(node: node) {
    const { "@ID": id, "@Value": value, "@Gate": gate } = node;

    if (id === undefined || typeof id !== "number") {
      throw new DominoError("Invalid XML: Not found CCMLink ID");
    }
    const param: ConstructorParameters<typeof CCMLink>[0] = { id };
    if (value !== undefined) {
      if (typeof value !== "number") {
        throw new DominoError("Invalid XML: Not found CCMLink Value");
      } else param.value = value;
    }
    if (gate !== undefined) {
      if (typeof gate !== "number") {
        throw new DominoError("Invalid XML: Not found CCMLink Gate");
      } else param.gate = gate;
    }

    const ccmLink = new this(param);
    return ccmLink;
  }
}

export class Value implements Base {
  public param: {
    default?: number;
    min?: number;
    max?: number;
    offset?: number;
    name?: string;
    type?: "Key";
    tableId?: number;
  };
  public tags?: Entry[];

  constructor(param: typeof Value.prototype.param = {}, tags?: Entry[]) {
    this.param = param;
    this.tags = tags;
  }

  check() {
    this.tags?.forEach((tag) => {
      const { min, max } = this.param;
      if (
        (min !== undefined && tag.param.value < min) ||
        (max !== undefined && tag.param.value > max)
      ) {
        throw new DominoError(
          `Entry Value must be between ${min} and ${max}. Received ${tag.param.value}`,
        );
      }
    });
  }

  toXMLNode() {
    this.check();
    const node: unode = {};
    if (this.param.default !== undefined) node["@Default"] = this.param.default;
    if (this.param.min !== undefined) node["@Min"] = this.param.min;
    if (this.param.max !== undefined) node["@Max"] = this.param.max;
    if (this.param.offset !== undefined) node["@Offset"] = this.param.offset;
    if (this.param.name !== undefined) node["@Name"] = this.param.name;
    if (this.param.type !== undefined) node["@Type"] = this.param.type;
    if (this.param.tableId !== undefined) node["@TableID"] = this.param.tableId;

    if (this.tags !== undefined) {
      node.Entry = this.tags.map((tag) => tag.toXMLNode());
    }
    return node;
  }

  static fromXMLNode(node: node) {
    const {
      "@Default": defaultValue,
      "@Min": min,
      "@Max": max,
      "@Offset": offset,
      "@Name": name,
      "@Type": type,
      "@TableID": tableId,
      Entry: entries_,
    } = node;

    const param: ConstructorParameters<typeof this>[0] = {};
    if (defaultValue !== undefined) {
      if (typeof defaultValue !== "number") {
        throw new DominoError("Invalid XML: Not found Value Default");
      } else param.default = defaultValue;
    }
    if (min !== undefined) {
      if (typeof min !== "number") {
        throw new DominoError("Invalid XML: Not found Value Min");
      } else param.min = min;
    }
    if (max !== undefined) {
      if (typeof max !== "number") {
        throw new DominoError("Invalid XML: Not found Value Max");
      } else param.max = max;
    }
    if (offset !== undefined) {
      if (typeof offset !== "number") {
        throw new DominoError("Invalid XML: Not found Value Offset");
      } else param.offset = offset;
    }
    if (name !== undefined) {
      param.name = String(name);
    }
    if (type !== undefined) {
      if (type !== "Key") {
        throw new DominoError("Invalid XML: Not found Value Type");
      } else param.type = type;
    }
    if (tableId !== undefined) {
      if (typeof tableId !== "number") {
        throw new DominoError("Invalid XML: Not found Value TableID");
      } else param.tableId = tableId;
    }

    const entries: Entry[] = [];
    if (isNode(entries_)) {
      nodeToArray(entries_).forEach((entry) => {
        entries.push(Entry.fromXMLNode(entry));
      });
    }

    const value = new this(param, entries);
    return value;
  }
}

export class Gate extends Value {}

export class Entry implements Base {
  public param: {
    label: string;
    value: number;
  };

  constructor(param: typeof Entry.prototype.param) {
    this.param = param;
  }

  check() {}

  toXMLNode() {
    this.check();
    const node: unode = {
      "@Label": this.param.label,
      "@Value": this.param.value,
    };
    return node;
  }

  static fromXMLNode(node: node) {
    const { "@Label": label, "@Value": value } = node;

    if (label === undefined) {
      throw new DominoError("Invalid XML: Not found Entry Label");
    }
    if (value === undefined || typeof value !== "number") {
      throw new DominoError("Invalid XML: Not found Entry Value");
    }

    const entry = new this({ label: String(label), value });
    return entry;
  }
}

export class Table implements Base {
  public param: { id: number };
  public tags: Entry[];

  constructor(param: typeof Table.prototype.param, tags?: Entry[]) {
    this.param = param;
    this.tags = tags || [];
  }

  check() {
    if (this.param.id < 0) {
      throw new DominoError(
        `Table ID must be 0 or more. Received: ${this.param.id}`,
      );
    }
  }

  toXMLNode() {
    this.check();
    const node: unode = {
      "@ID": this.param.id,
    };
    node.Entry = this.tags.map((tag) => tag.toXMLNode());
    return node;
  }

  static fromXMLNode(node: node) {
    const { "@ID": id, Entry: entries_ } = node;

    if (id === undefined || typeof id !== "number") {
      throw new DominoError("Invalid XML: Not found Table ID");
    }

    let tags: ConstructorParameters<typeof this>[1];
    if (isNode(entries_)) {
      tags = nodeToArray(entries_).map((entry) => Entry.fromXMLNode(entry));
    }

    const table = new this({ id }, tags);
    return table;
  }
}

export class Data implements Base {
  public text: string;
  constructor(text: string) {
    this.text = text;
  }

  check() {}

  toXMLNode() {
    this.check();
    const node: unode = { "#text": this.text };
    return node;
  }

  static fromXMLNode(node: string) {
    const data = new this(node);
    return data;
  }
}

export class TemplateFolder implements Base {
  public param: {
    name: string;
  };
  public tags: Template[];

  constructor(
    param: typeof TemplateFolder.prototype.param,
    tags?: typeof TemplateFolder.prototype.tags,
  ) {
    this.param = param;
    this.tags = tags || [];
  }

  check() {}

  toXMLNode() {
    this.check();
    const node: unode = {
      "@Name": this.param.name,
      Template: this.tags.map((tag) => tag.toXMLNode()),
    };

    return node;
  }

  static fromXMLNode(node: node) {
    const { "@Name": name, Template: tags_ } = node;

    if (name === undefined) {
      throw new DominoError("Invalid XML: Not found Folder Name");
    }

    const tags: Template[] = [];
    if (isNode(tags_)) {
      nodeToArray(tags_).forEach((tag) => {
        tags.push(Template.fromXMLNode(tag));
      });
    }

    const folder = new this({ name: String(name) }, tags);
    return folder;
  }
}

export class Template implements Base {
  public param: { id?: number; name: string };
  public tags: CC[];

  constructor(
    param: typeof Template.prototype.param,
    tags?: typeof Template.prototype.tags,
  ) {
    this.param = param;
    this.tags = tags || [];
  }

  check() {
    if (this.param.id !== undefined && this.param.id < 0) {
      throw new DominoError(
        `Template ID must be 0 or more. Received: ${this.param.id}`,
      );
    }
  }

  toXMLNode() {
    this.check();
    const node: unode = {
      "@Name": this.param.name,
      CC: this.tags.flatMap((tag) => {
        if (tag instanceof CC) return [tag.toXMLNode()];
        else return [];
      }),
    };
    if (this.param.id !== undefined) {
      node["@ID"] = this.param.id;
    }
    return node;
  }

  static fromXMLNode(node: node) {
    const { "@Name": name, "@ID": id, CC: ccs_ } = node;

    if (name === undefined) {
      throw new DominoError("Invalid XML: Not found Template Name");
    }
    const params: ConstructorParameters<typeof this>[0] = {
      name: String(name),
    };
    if (id !== undefined) {
      if (typeof id !== "number") {
        throw new DominoError("Invalid XML: Not found Template ID");
      } else params.id = id;
    }

    const tags: ConstructorParameters<typeof this>[1] = [];
    if (isNode(ccs_)) {
      nodeToArray(ccs_).forEach((ccNode) => {
        tags.push(CC.fromXMLNode(ccNode));
      });
    }

    const template = new this(params, tags);
    return template;
  }
}

export class CC implements Base {
  public param: { id: number; value?: number; gate?: number };

  constructor(param: typeof CC.prototype.param) {
    this.param = param;
  }

  check() {}

  toXMLNode() {
    this.check();
    const node: unode = {
      "@ID": this.param.id,
    };
    if (this.param.value !== undefined) node["@Value"] = this.param.value;
    if (this.param.gate !== undefined) node["@Gate"] = this.param.gate;

    return node;
  }

  static fromXMLNode(node: node) {
    const { "@ID": id, "@Value": value, "@Gate": gate } = node;

    if (id === undefined || typeof id !== "number") {
      throw new DominoError("Invalid XML: Not found CC ID");
    }

    const params: ConstructorParameters<typeof this>[0] = {
      id,
    };
    if (value !== undefined) {
      if (typeof value !== "number") {
        throw new DominoError("Invalid XML: Not found CC Value");
      } else params.value = value;
    }
    if (gate !== undefined) {
      if (typeof gate !== "number") {
        throw new DominoError("Invalid XML: Not found CC Gate");
      } else params.gate = gate;
    }

    const cc = new this(params);
    return cc;
  }
}

interface Base {
  check(): void;
  toXMLNode(): unode;
}
