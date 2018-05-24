const express = require('express')

const app = express()

app.set('port', process.env.PORT || '3000')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const routes = require('./routes')
app.use(routes)

app.listen(app.get('port'), err => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`Server running at port:${app.get('port')}`)
})
