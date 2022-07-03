const imaps = require('imap-simple')
const { convert } = require('html-to-text')
const { READ_MAIL_CONFIG, SENDER_AUTH } = require('./config')

const FOLDERS = {
  inbox: 'INBOX',
  spam: '[Gmail]/Spam',
  sent: '[Gmail]/Sent Mail',
  drafts: '[Gmail]/Drafts',
  all: '[Gmail]/All Mail',
}

const readMail = async () => {
  try {
    const connection = await imaps.connect(READ_MAIL_CONFIG)
    console.log('✔ Connection successful')

    const searchCriteria = ['UNSEEN', ['FROM', SENDER_AUTH.user]]
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT'],
      markSeen: true,
    }

    await connection.openBox(FOLDERS.inbox)
    let results = await connection.search(searchCriteria, fetchOptions)

    if (!results.length) {
      await connection.openBox(FOLDERS.spam)
      results = await connection.search(searchCriteria, fetchOptions)
    }

    const lastEmail = results
      .at(-1)
      ?.parts.filter(part => part.which === 'TEXT')
    const lastEmailText = convert(lastEmail?.[0].body)
    connection.end()

    return lastEmailText
  } catch (err) {
    console.error(err.message)
  }
}

module.exports = readMail
