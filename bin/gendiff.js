#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '@hexlet/code';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program
  .option('-f, --format [type]', 'format output', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    const diff = genDiff(filepath1, filepath2, options.format);
    console.log(diff);
  });

program.parse();
