#!/usr/bin/env node

import { Command } from "commander";
import compareFiles from "../src/index.js";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0");

program
  .option("-f, --format [type]", "format output", "stylish")
  .argument("<filepath1>")
  .argument("<filepath2>")
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const compareResult = compareFiles(filepath1, filepath2, options.format);
    console.log(compareResult);
  });

program.parse();
