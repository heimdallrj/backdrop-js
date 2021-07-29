import { response } from 'utils/http';
import Mailer from 'utils/email';

// eslint-disable-next-line consistent-return
export function post(req, res) {
  try {
    const { to, subject, text } = req.body;

    const mailer = new Mailer();

    mailer.send(to, subject, text, (err, resp) => {
      if (err) {
        return response.internalError(res);
      }
      return response.ok(res, resp);
    });
  } catch (err) {
    return response.internalError(res);
  }
}
