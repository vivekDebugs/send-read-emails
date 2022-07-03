const nodemailer = require('nodemailer')
const { SEND_MAIL_CONFIG } = require('./config')

const transporter = nodemailer.createTransport(SEND_MAIL_CONFIG)

const sendMail = async confirmationCode => {
  try {
    const time = new Date().toString()
    const info = await transporter.sendMail({
      from: SEND_MAIL_CONFIG.auth.user,
      to: SEND_MAIL_CONFIG.auth.user,
      subject: `${confirmationCode} is your confirmation code`,
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2><pre>${confirmationCode}</pre></h2>
        <p>Sent at: ${time}</p>
      </div>
      `,
    })
    console.log(`✔ Mail Sent`)
    return !!info
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = sendMail
