const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const dca = require('./dca')
const dca2 = require('./dca2')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// start buy script

const payload = {
  asset: 'ETH',
  amount: 1,
  days: 5,
  pairing: 'USD',
}
// dca.start(payload)

// dca2.test({ text: 'testing' })
dca2.start({
  asset: 'ETH',
  totalAmount: 1,
  days: 10,
  pairing: 'USD',
  // interval in minutes
  minuteInterval: 60,
  cronInterval: ' * 1 * * * *',
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
