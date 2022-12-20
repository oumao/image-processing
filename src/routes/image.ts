import express, { Router } from 'express'
import convertImage from '../controllers/imagescontroller'

const imageRoute: Router = express.Router()

imageRoute.route('/images/:image').get(convertImage)

export { imageRoute }
