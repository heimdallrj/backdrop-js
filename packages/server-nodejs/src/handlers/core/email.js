import nodemailer from 'nodemailer';

import { response } from 'utils/http';
import { smtpHost, smtpPort, smtpUser, smtpPass, smtpFrom } from 'config';

// eslint-disable-next-line consistent-return
export function post(req, res) {
  try {
    const { to, subject, text } = req.body;

    const transport = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const message = {
      from: smtpFrom,
      to,
      subject,
      text,
    };

    transport.sendMail(message, (err, resp) => {
      if (err) {
        return response.internalError(res);
      }
      return response.ok(res, resp);
    });
  } catch (err) {
    return response.internalError(res);
  }
}
