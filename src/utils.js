const randomNumber = () => Math.floor(Math.random() * 1000000)
const regex = /(\G-\S+)/g

module.exports = { randomNumber, regex }
