import fs from "fs";
import path from "path";


const composeAbsoluteFilePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => fs.readFileSync(composeAbsoluteFilePath(filepath));
const getFileExtension = (filepath) => path.extname(filepath).split(".")[1];

export { readFile, getFileExtension };
