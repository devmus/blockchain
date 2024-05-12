import fs from 'fs';
import path from 'path';

export const createFiles = (message, dirName, fileName) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

export const checkEntry = (message, dirName, fileName, time) => {
  try {
    const filePath = path.join(__appdir, dirName, fileName);
    if (!fs.existsSync(filePath)) return false;

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split(/\r?\n/);
    const lastLine = lines[lines.length - 2];

    if (fileName === 'app.log') {
      const lastLineParts = lastLine.split(' - ');
      if (lastLineParts.length < 3) return false;

      const lastLineTime = lastLineParts[lastLineParts.length - 1].trim();
      const skip = lastLineTime === time;
      return skip;
    } else if (fileName === 'error.log') {
      const parts = lastLine.split('Time: ');
      const lastLineTime = parts[1].split(' Success:');

      const skip = lastLineTime[0] === time;
      return skip;
    }
  } catch (error) {
    console.error('Failed to check log entry:', error);
    return false;
  }
};

export const writeFileAsync = async (folderName, fileName, data) => {
  try {
    const filePath = path.join(__appdir, folderName, fileName);
    await fs.promises.writeFile(filePath, data);
  } catch (error) {
    throw error;
  }
};

export const readFile = (folderName, fileName) => {
  try {
    const filePath = path.join(__appdir, folderName, fileName);
    const result = fs.readFileSync(filePath, 'utf-8');
    if (result) {
      return JSON.parse(result);
    }
  } catch (error) {
    throw error;
  }
};
