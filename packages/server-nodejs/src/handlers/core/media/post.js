import forEach from 'lodash/forEach';
import keysIn from 'lodash/keysIn';
import { response } from 'utils/http';

import { mediaPath, baseUrl, mediaDir } from 'config';

export default async function post(req, res) {
  try {
    if (!req.files) {
      response.bad(res);
    } else {
      const { files } = req.files;
      const isSingleFile = !Array.isArray(files);

      if (isSingleFile) {
        files.mv(`${mediaPath}/${files.name}`);
        response.ok(res, [
          {
            name: files.name,
            size: files.size,
            mimetype: files.mimetype,
            md5: files.md5,
            url: `${baseUrl}/${mediaDir}/${files.name}`,
          },
        ]);
      } else {
        const payload = [];

        forEach(keysIn(files), (key) => {
          const file = files[key];
          file.mv(`${mediaPath}/${file.name}`);

          payload.push({
            name: file.name,
            size: file.size,
            mimetype: file.mimetype,
            md5: file.md5,
            url: `${baseUrl}/${mediaDir}/${file.name}`,
          });
        });

        response.ok(res, payload);
      }
    }
  } catch (err) {
    response.internalError(res);
  }
}
