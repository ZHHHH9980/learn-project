const express = require('express')

const friendsRouter = require('./routes/friends.routes');
const messagesRouter = require('./routes/messages.routes');
const app = express()

const port = 3000

app.use('/friends', friendsRouter);

app.use('/messages', messagesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
