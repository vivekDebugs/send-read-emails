const imaps = require('imap-simple')
const { convert } = require('html-to-text')
const { READ_MAIL_CONFIG, SENDER_AUTH } = require('./config')

const readMail = async () => {
  try {
    const connection = await imaps.connect(READ_MAIL_CONFIG)
    console.log('✔ Connection successful')
    await connection.openBox('INBOX')
    const searchCriteria = ['UNSEEN', ['FROM', SENDER_AUTH.user]]
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT'],
      markSeen: false,
    }

    const results = await connection.search(searchCriteria, fetchOptions)

    const lastEmail = results.at(-1).parts.filter(part => part.which === 'TEXT')
    const lastEmailText = convert(lastEmail[0].body)
    connection.end()

    return lastEmailText
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = readMail
