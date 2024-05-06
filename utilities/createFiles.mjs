import fs from 'fs';
import path from 'path';

export const createFiles = (message, dirName, fileName) => {
  if (!fs.existsSync(path.join(__appdir, dirName))) {
    fs.mkdirSync(path.join(__appdir, dirName));
  }

  const filePath = path.join(__appdir, dirName, fileName);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, message);
  } else {
    let data = fs.readFileSync(filePath, 'utf-8');
    if (data) {
      fs.appendFileSync(filePath, message);
    } else {
      fs.writeFileSync(filePath, message);
    }
  }
};
