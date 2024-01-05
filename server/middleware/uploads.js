const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'image') {
      cb(null, '../client/src/assets/image');
    } else if (file.fieldname === 'sign') {
      cb(null, '../client/src/assets/sign');
    } else if (file.fieldname === 'thumb') {
      cb(null, '../client/src/assets/thumb');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();

    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fieldSize: 50 * 1024 },
});

module.exports = upload;
