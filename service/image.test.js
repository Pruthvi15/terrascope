const { getImage } = require('./image');
const sharp = require('sharp');
jest.mock('sharp');

const mockStream = { pipe: jest.fn() };

sharp.mockImplementation(() => {
  return {
    jpeg: () => mockStream,
    png: () => mockStream,
    resize: () => {
      return { gif: () => mockStream };
    }
  };
});

describe('test for image handling services', () => {
  test('test getImage to return the image', () => {
    const request = {
      params: {
        id: 'testid.png'
      },
      query: {
        type: 'png'
      }
    };

    const mockSendFile = jest.fn(e => e);

    const response = {
      sendFile: mockSendFile
    };

    getImage(request, response);
    expect(mockSendFile).toHaveBeenCalled();
    expect(mockSendFile).toHaveBeenCalledWith(`${process.cwd()}/data/${request.params.id}`);
  });

  test('test getImage to return the image', () => {
    const request = {
      params: {
        id: 'testid.gif'
      },
      query: {
        type: 'png'
      }
    };

    const mockSendFile = jest.fn(e => e);

    const response = {
      sendFile: mockSendFile
    };

    getImage(request, response);
    expect(mockStream.pipe).toHaveBeenCalled();
  });
});
