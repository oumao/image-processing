import { Request, Response, NextFunction } from "express"
import path from "path"
import { promises as fsPromise } from "fs"


const validateImage = async (req:Request, res: Response, next: NextFunction): Promise<void> => {  

    // Destructuring request query
    const { name, height, width } = req.query

    const imgHeight = parseInt(height as string) // height of the image
    const imgWidth = parseInt(width as string) // width of the image

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

  // validate empty image name
    if (name?.length === 0 || name === undefined) {
        res.status(400).send('Image Name must be provided')
      }
  
      // validate the height and width
      if (isNaN(imgWidth) || isNaN(imgHeight)) {
        res.status(400).send('The width and height must be a number')
      }
  
      // Check for image name
      if (!checkName) {
        res.status(404).send('The Image name does not exist')
      }

      next()
      
}

export default validateImage