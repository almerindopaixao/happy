import nodemailer from 'nodemailer';

import { host, port, user, pass } from '../../mail.json';

const transport = nodemailer.createTransport({
  host: host,
  port: port,
  auth: {
    user: user,
    pass: pass,
  },
});

export default transport;
