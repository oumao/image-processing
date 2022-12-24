import express, { Router } from 'express'
import convertImage from '../controllers/imagescontroller'
import validateImage from '../middlewares/imageValidator'

const imageRoute: Router = express.Router()

// image route
imageRoute.route('/images').get(validateImage, convertImage)

export { imageRoute }
