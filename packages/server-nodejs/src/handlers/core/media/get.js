import { readdirSync } from 'fs';
import { response } from 'utils/http';
import { ensureDirSync } from 'utils/fs';

import { mediaPath, baseUrl, mediaDir, filesToBeIgnored } from 'config';

const FILE_TYPES = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  gif: 'image/gif',
  mp3: 'audio/mpeg',
  mp4: 'video/mp4',
  mpeg: 'video/mpeg',
  png: 'image/png',
  pdf: 'application/pdf',
};

export default function get(req, res) {
  try {
    ensureDirSync(mediaPath);

    const files = readdirSync(mediaPath);
    const toResponse = files
      .filter((f) => !filesToBeIgnored.includes(f))
      .map((fileName) => {
        const ext = fileName.split('.').reverse()[0];
        return {
          url: `${baseUrl}/${mediaDir}/${fileName}`,
          type: FILE_TYPES[ext],
          name: fileName,
        };
      });

    response.ok(res, toResponse);
  } catch (err) {
    response.internalError(res);
  }
}
