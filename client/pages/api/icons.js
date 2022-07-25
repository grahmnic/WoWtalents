import path from 'path';
import fsPromises from 'fs/promises';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'constants/icons.json');
  const data = await fsPromises.readFile(filePath);

  return res.json(JSON.parse(data));
}
