import path from 'path'
import { Request, Response } from 'express'
import sharp from 'sharp'

const convertImage = async (req: Request, res: Response): Promise<void> => {
  // Getting the path to images
  const imagePath: string = path.join(process.cwd(), 'public', 'images', req.params.image)

  // Sharp library to convert the size of the image
  const finalImage = await sharp()
    .png()
    .toBuffer()

  res.sendFile(imagePath)
}

export default convertImage
