import path from 'path'
import { promises as fsPromise } from 'fs'
import { Request, Response } from 'express'
import imageResize from '../utils/imageResize'

const convertImage = async (req: Request, res: Response): Promise<void> => {
  try {
    // Destructuring request query
    const { name, height, width } = req.query

    const imgHeight = parseInt(height as string) // height
    const imgWidth = parseInt(width as string) // width

    // Extracting filenames available in public/images
    const checkFiles = await fsPromise.readdir(
      path.join(process.cwd(), 'public', 'images')
    )

    // Extracting filenames without extensions
    const names: string[] = checkFiles.map((file) =>
      path.basename(file, '.jpg')
    )

    // boolean to check if name exists in extracted image files available at the public/image
    const checkName: boolean = names.includes(name as string)

    // Getting the path to images
    const imagePath: string = path.join(
      process.cwd(),
      'public',
      'images',
      `${name as string}.jpg`
    )

    // Destination path
    const finalPath: string = path.join(
      process.cwd(),
      'public',
      'thumb',
      `${name as string}_thumb.png`
    )

    // validate empty image name
    if (name?.length === 0 || name === undefined) {
      res.status(400).send('Image Name must be provided')
    }

    // validate the height and width
    if (isNaN(imgWidth) && isNaN(imgHeight)) {
      res.status(400).send('The width and height must be a number')
    }

    // Check for image name
    if (!checkName) {
      res.status(400).send('The Image name does not exist')
    }

    // Function to convert the size of the image
    await imageResize(imagePath, imgWidth, imgHeight, finalPath)

    res.status(200).sendFile(finalPath)
  } catch (error) {
    // console.log(error)
  }
}
export default convertImage
