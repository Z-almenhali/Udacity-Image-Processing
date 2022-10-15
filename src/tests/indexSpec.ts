import supertest from 'supertest';
import app from '../index';
import * as fs from 'fs';

const request = supertest(app.app);
//Failed cases
describe('Test failed endpoint responses', () => {
  it('check if the parameter sent', async () => {
    // Arrange
    const endpoint = '/images';
    // Act
    const response = await request.get(endpoint);
    // Assert
    expect(response.status).toBe(400);
    expect(response.text).toBe('parameter not sent');
  });

  it('check if the Image exists', async () => {
    // Arrange
    const endpoint = '/images?filename=dog';
    // Act
    const response = await request.get(endpoint);
    // Assert
    expect(response.status).toBe(400);
    expect(response.text).toBe('image not found');
  });
});

//Successful cases
describe('Test successful endpoint responses', () => {
  it('find image without resizing', async () => {
    // Arrange
    const endpoint = '/images?filename=cat';
    // Act
    const response = await request.get(endpoint);
    // Assert
    expect(response.status).toBe(200);
  });
});

it('Image resized and saved', async () => {
  // Arrange
  const endpoint = '/images?filename=cat&width=121&height=121';
  // Act
  const response = await request.get(endpoint);
  // Assert
  fs.stat('./thumb/cat-121-121.jpg', (err: NodeJS.ErrnoException | null) => {
    expect(response.status).toBe(200);
    expect(err).toBe(null);
  });
});
