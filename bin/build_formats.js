#!/usr/bin/env node

const fs = require("fs");
const sleepdiary = require("../../core/sleepdiary-core.min.js");

const base_dir = __filename.replace(/[^\/]*$/,"/../create/");

const engine_callback = new Function(
    'f',
    'return `'
    + fs.readFileSync(`${base_dir}/formats.md.mid`).toString()
    + '`'
);

fs.writeFileSync(
    `${base_dir}/formats.md`,
    fs.readFileSync(`${base_dir}/formats.md.pre`).toString() +
    sleepdiary.sleepdiary_engines.map( f => engine_callback(f) ).join("") +
    fs.readFileSync(`${base_dir}/formats.md.post`).toString()
);
