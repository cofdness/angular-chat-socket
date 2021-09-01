import mongoose from 'mongoose'
import config from './index.js'
import {mongo} from "../config";

mongoose.Types.ObjectId.prototype.view = function () {
  return { id: this.toString() }
}

const CONNECTION_URL = `mongodb+srv://${config.db.url}/${config.db.name}`

main().catch(err => console.log(err))

async function main() {
  await mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

// mongoose.connect(CONNECTION_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

mongoose.connection.on('connected', () => {
  console.log('Mongo has connected succesfully')
})
mongoose.connection.on('reconnected', () => {
  console.log('Mongo has reconnected')
})
mongoose.connection.on('error', error => {
  console.log('Mongo connection has an error', error)
  mongoose.disconnect()
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
})
