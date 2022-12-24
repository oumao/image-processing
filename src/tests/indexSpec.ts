import supertest from 'supertest'
import sizeOf from 'image-size'
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
})

describe('Check Image Stats', () => {
  // Testing image existing
  it('checks if the image file exists', () => {
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
  it('checks if the final resized image file exists', () => {
    const filePath = path.join(
      process.cwd(),
      'public',
      'thumb',
      'fjord_thumb.png'
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

  it('check if file is shrinked to 200 by 200', () => {
    // path to resized image
    const filePath = path.join(
      process.cwd(),
      'public',
      'thumb',
      'fjord_thumb.png'
    )

    // getting dimensions of the file
    const dimensions = sizeOf(filePath)

    // If both width and height meets final dimensions
    expect(dimensions.width).toEqual(200)
    expect(dimensions.height).toBe(200)
  })
})
