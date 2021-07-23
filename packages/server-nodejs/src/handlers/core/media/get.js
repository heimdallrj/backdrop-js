import { readdirSync } from 'fs';
import { response } from 'utils/http';
import { ensureDirSync } from 'utils/fs';

import { mediaPath, baseUrl, mediaDir, filesToBeIgnored } from 'config';

export default function get(req, res) {
  try {
    ensureDirSync(mediaPath);

    const files = readdirSync(mediaPath)
      .filter((f) => !filesToBeIgnored.includes(f))
      .map((f) => `${baseUrl}/${mediaDir}/${f}`);
    response.ok(res, files);
  } catch (err) {
    response.internalError(res);
  }
}
