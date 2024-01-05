const fs = require('fs').promises;

async function deleteFiles(files) {
  try {
    if (files && files.image && files.sign && files.thumb) {
      await Promise.all([
        fs.unlink(files.image[0].path),
        fs.unlink(files.sign[0].path),
        fs.unlink(files.thumb[0].path),
      ]);
    }
  } catch (err) {
    console.error('Error deleting files:', err);
    throw err; // Re-throw the error for handling at the caller's level if needed
  }
}

module.exports = { deleteFiles };
