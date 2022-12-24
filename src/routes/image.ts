import express, { Router } from 'express'
import convertImage from '../controllers/imagescontroller'

const imageRoute: Router = express.Router()

// image route
imageRoute.route('/images').get(convertImage)

export { imageRoute }
