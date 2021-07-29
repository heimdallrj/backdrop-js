import nodemailer from 'nodemailer';

import { smtpHost, smtpPort, smtpUser, smtpPass, smtpFrom } from 'config';

export default function mailer() {
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    // secure: false,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
  });

  return {
    send(to, subject, text, cb) {
      const mailOptions = {
        from: smtpFrom,
        to,
        subject,
        text,
      };

      transporter.sendMail(mailOptions, cb);
    },
  };
}
