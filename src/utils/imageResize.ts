import sharp from 'sharp'

// Function to resize the provided image using Sharp
const imageResize = async (
  imagePath: string,
  width: number,
  height: number,
  finalPath: string
): Promise<void> => {
  await sharp(imagePath).resize(width, height).toFile(finalPath)
}

export default imageResize
