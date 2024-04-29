import fs from "fs";
import path from "path";

const composeAbsFilepath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => fs.readFileSync(composeAbsFilepath(filepath));
const getFileExt = (filepath) => path.extname(filepath).split(".")[1];

export { readFile, getFileExt };
