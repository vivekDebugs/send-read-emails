const dotenv = require('dotenv')

dotenv.config()

const AUTH = {
  user: process.env.AUTH_EMAIL,
  pass: process.env.AUTH_PASSWORD,
}

const SENDER_AUTH = {
  user: AUTH.user,
  pass: AUTH.pass,
}

const RECEIVER_AUTH = {
  user: AUTH.user,
  pass: AUTH.pass,
}

const SEND_MAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: SENDER_AUTH.user,
    pass: SENDER_AUTH.pass,
  },
}

const READ_MAIL_CONFIG = {
  imap: {
    user: RECEIVER_AUTH.user,
    password: RECEIVER_AUTH.pass,
    host: 'imap.gmail.com',
    port: 993,
    authTimeout: 10000,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  },
}

module.exports = { SEND_MAIL_CONFIG, READ_MAIL_CONFIG, SENDER_AUTH }
