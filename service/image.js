const sharp = require('sharp');

const getImage = (req, res) => {
  const id = req.params.id;
  const type = req.query.type;
  const allowedTypes = /jpeg|png|jpg|gif/i;
  if (type && type.toLowerCase() !== id.split('.')[1].toLowerCase() && allowedTypes.test(type)) {
    switch (type.toLowerCase()) {
      case 'jpeg':
      case 'jpg': {
        const convertStream = sharp(`${__dirname}/../data/${id}`).jpeg();
        convertStream.pipe(res);
        break;
      }
      case 'png': {
        const convertStream = sharp(`${__dirname}/../data/${id}`).png();
        convertStream.pipe(res);
        break;
      }
      case 'gif': {
        const convertStream = sharp(`${__dirname}/../data/${id}`).resize({ width: 2000, height: 2000 }).gif();
        convertStream.pipe(res);
        break;
      }
      default:
        throw new Error('Invalid format');
    }
  } else {
    res.sendFile(`${process.cwd()}/data/${id}`);
  }
};

module.exports = { getImage };
