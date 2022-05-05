// Copyright 2022 kamekyame. All rights reserved. MIT license.

import * as Domino from "../mod.ts";

const str = await Deno.readTextFile("./example/example.xml");

const file = Domino.File.fromXML(str);
console.log(file);
