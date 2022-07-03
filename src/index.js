const readMail = require('./readMail.js')
const sendMail = require('./sendMail')
const { randomNumber, regex } = require('./utils.js')

const main = async () => {
  const confirmationCode = `G-${randomNumber()}`

  const isMailSent = await sendMail(confirmationCode)
  if (isMailSent) {
    const lastEmailText = await readMail()
    const code = lastEmailText.match(regex)[0]
    console.log({ confirmationCode, code })
  }
}

main()
