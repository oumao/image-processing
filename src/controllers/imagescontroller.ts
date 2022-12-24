import path from 'path'
import { Request, Response } from 'express'
import imageResize from '../utils/imageResize'

const convertImage = async (req: Request, res: Response): Promise<void> => {
  try {
    // Caching the response until new data is supplied
    res.set('Cache-control', 'private, must-revalidate')

    // Destructuring request query
    const { name, height, width } = req.query

    const imgHeight = parseInt(height as string) // height of the image
    const imgWidth = parseInt(width as string) // width of the image

    // Getting the path to images
    const imagePath: string = path.join(
      process.cwd(),
      'public',
      'images',
      `${name as string}.jpg`
    )

    // Destination path of resized image
    const finalPath: string = path.join(
      process.cwd(),
      'public',
      'thumb',
      `${name as string}_thumb.png`
    )

    // Function to convert the size of the image
    await imageResize(imagePath, imgWidth, imgHeight, finalPath)

    res.status(200).sendFile(finalPath)
  } catch (error) {
    // console.log(error)
  }
}
export default convertImage
