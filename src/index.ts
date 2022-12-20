// Third party imports
import 'dotenv/config'
import express from 'express'
import { imageRoute } from './routes/image'

// Local Imports

const app = express()

// Defining port
const port = process.env.PORT ?? 3000 as number

// Routes
app.use('/api', imageRoute)

// static folder
app.use(express.static('public'))

// Server Startup Function
const start = (): void => {
  app.listen(port, () => console.log(`Server Running on Port ${port}`))
}

start()
