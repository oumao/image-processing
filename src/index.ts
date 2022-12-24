// Third party imports
import 'dotenv/config'
import express, { Application } from 'express'
import morgan from 'morgan'
import { imageRoute } from './routes/image'

// Instantiate express
const app: Application = express()

// Defining port
const port = process.env.PORT ?? (3000 as number)

// Morgan to log request logs on the console
const logger = morgan(':method :url :status :response-time ms')

// logger middleware
app.use(logger)

// Routes
app.use('/api', imageRoute)

// static folder
app.use(express.static('public'))

// Server Startup Function
const start = (): void => {
  app.listen(port, () => console.log(`Server Running on Port ${port}`))
}

start() // Invoking server start function

export default app
