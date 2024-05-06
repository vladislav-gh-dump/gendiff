import path from 'path';
import { composeAbsFilepath, readFile } from '../src/utils.js';
import getFormatter from '../src/formatters/index.js';
import getParser from '../src/parsers.js';
import compareFiles from '../src/index.js';

const __dirname = composeAbsFilepath('__tests__');
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const formats = ['stylish', 'plain', 'json'];

describe('get formatter', () => {
  test.each(formats)('%s', (format) => {
    expect(getFormatter(format) && true).toBeTruthy();
  });
  test('wrong format', () => {
    expect(() => getFormatter('wrong')).toThrow();
  });
});

describe('get parser', () => {
  test
    .each([
      'json',
      'yaml',
      'yml',
    ])('for %s', (ext) => {
      expect(getParser(ext) && true).toBeTruthy();
    });

  test('wrong extension', () => {
    expect(() => getParser('wrong')).toThrow();
  });
});

const exts = [
  ['json', 'json'],
  ['yaml', 'yaml'],
  ['json', 'yaml'],
];

describe
  .each(exts)('gendiff filepath1.%s filepath2.%s', (ext1, ext2) => {
    const filepath1 = getFixturePath(`nested/file1.${ext1}`);
    const filepath2 = getFixturePath(`nested/file2.${ext2}`);

    test.each(formats)('--format %s', (format) => {
      const result = compareFiles(filepath1, filepath2, format);
      const expected = readFile(getFixturePath(`expectedDiffs/${format}.txt`));

      expect(result).toEqual(expected);
    });
  });
