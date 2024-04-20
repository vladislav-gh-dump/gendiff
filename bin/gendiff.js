#!/usr/bin/env node

import { Command } from "commander";
import compareFiles from "../src/comparator.js";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0");

program
  .argument("<filepath1>")
  .argument("<filepath2>")
  .action((filepath1, filepath2) => {
    const compareResult = compareFiles(filepath1, filepath2);
    console.log(compareResult);
  });

program
  .option("-f, --format [type]", "output format");

program.parse();