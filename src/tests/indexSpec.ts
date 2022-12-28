import supertest from 'supertest'
import sizeOf from 'image-size'
import imageResize from '../utils/imageResize'
import fs from 'fs'
import path from 'path'

import app from '../index'

describe('Image Resizing Route', () => {
  const request = supertest(app)

  it('Should send a resized file', (done) => {
    request
      .get('/images')
      .query({ name: 'fjord', width: 200, height: 200 })
      .expect(200)
      .end((err: Error, res) => {
        if (err != null) {
          return done.fail(err)
        }
      })

    done()
  })

  it('Should resize image using sharp', (done) => {
    const imgName = 'santamonica'
    const imgWidth = 200
    const imgHeight = 200
    // Getting the path to images
    const imagePath: string = path.join(
      process.cwd(),
      'public',
      'images',
      `${imgName as string}.jpg`
    )

  // Destination path of resized image
  const finalPath: string = path.join(
    process.cwd(),
    'public',
    'thumb',
    `${imgName as string}_${imgWidth}X${imgHeight}_thumb.png`
  )

    imageResize(imagePath, 200, 200, finalPath)

    expect(finalPath).toBeDefined()
    expect(sizeOf(finalPath).width).toEqual(200)
    expect(sizeOf(finalPath).height).toEqual(200)

    done()
  })
})

describe('Check Image Stats', () => {
  // Testing image existing
  it('Should checks if the image file exists', () => {
    const filePath = path.join(process.cwd(), 'public', 'images', 'fjord.jpg')

    // Use the fs.stat function to check the status of the file
    fs.stat(filePath, function (err, stats) {
      // If the file doesn't exist, stats will be undefined
      expect(stats).toBeDefined()

      if (err != null) {
        console.log(err)
      }
    })
  })

  // Check if final resized image exists
  it('should checks if the final resized image file exists', () => {
    const filePath = path.join(
      process.cwd(),
      'public',
      'thumb',
      'santamonica_200X200_thumb.png'
    )

    // Use the fs.stat function to check the status of the file
    fs.stat(filePath, function (err, stats) {
      // If the file doesn't exist, stats will be undefined
      expect(stats).toBeDefined()

      if (err != null) {
        console.log(err)
      }
    })
  })

  it('Should check if file is shrinked to 200 by 200', () => {
    // path to resized image
    const filePath = path.join(
      process.cwd(),
      'public',
      'thumb',
      'santamonica_200X150_thumb.png'
    )

    // getting dimensions of the file
    const dimensions = sizeOf(filePath)

    // If both width and height meets final dimensions
    expect(dimensions.width).toEqual(200)
    expect(dimensions.height).toBe(150)
  })

  it('Should check if file is greater than or equal to 50', () => {
    // path to resized image
    const filePath = path.join(
      process.cwd(),
      'public',
      'thumb',
      'palmtunnel_200X200_thumb.png'
    )

    // getting dimensions of the file
    const dimensions = sizeOf(filePath)

    // If both width and height meets final dimensions
    expect(dimensions.width).toBeGreaterThanOrEqual(50)
    expect(dimensions.height).toBeGreaterThanOrEqual(50)
  })
})
