#!/usr/bin/env node

import { Command } from "commander";
import parseFiles from "../src/parse-files.js";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0");

program
  .argument("<filepath1>")
  .argument("<filepath2>")
  .action((filepath1, filepath2) => {
    const parseResult = parseFiles(filepath1, filepath2);
    console.log(parseResult);
  });

program
  .option("-f, --format [type]", "output format");

program.parse();