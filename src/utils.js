import fs from 'fs';
import path from 'path';

const composeAbsFilepath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath, encoding = 'utf8') => {
  const absFilepath = composeAbsFilepath(filepath);
  return fs.readFileSync(absFilepath, encoding);
};

const getFileExt = (filepath) => path.extname(filepath).split('.')[1];

export { composeAbsFilepath, readFile, getFileExt };
