const validation = async (req, res, deleteFiles) => {
  try {
    const {
      PASSWORD,
      CONFIRM_PASSWORD,
      JeeCandidate,
      candidateExist,
      pattern,
      files,
    } = req;

    const imageSize = files.image[0].size;
    const signSize = files.sign[0].size;
    const thumbSize = files.thumb[0].size;
    const maxFileSize = 50 * 1024;

    if (PASSWORD.length < 7 || PASSWORD.length >= 15) {
      await deleteFiles(files);
      return res.status(400).json({
        error: 'password must contain at least 7 chars and at most 15 chars',
      });
    } else if (!pattern.test(PASSWORD)) {
      await deleteFiles(files);
      return res.status(400).json({
        error:
          'password must contain at least one upper case, one lower case, and one special character',
      });
    } else if (CONFIRM_PASSWORD !== PASSWORD) {
      await deleteFiles(files);
      return res.status(400).json({
        error: 'passwords are not matching',
      });
    } else if (!JeeCandidate) {
      await deleteFiles(files);
      return res.status(400).json({ error: 'Invalid Candidate' });
    } else if (candidateExist) {
      await deleteFiles(files);
      return res.status(400).json({ error: 'Candidate already exists' });
    }

    // Validating Image Size

    if (imageSize > maxFileSize) {
      await deleteFiles(files);
      return res
        .status(400)
        .json({ error: 'image size should be maximum 50kb' });
    } else if (signSize > maxFileSize) {
      await deleteFiles(files);
      return res
        .status(400)
        .json({ error: 'sign image size should be maximum 50kb' });
    } else if (thumbSize > maxFileSize) {
      await deleteFiles(files);
      return res
        .status(400)
        .json({ error: 'thumb image size should be maximum 50kb' });
    }

    return null; // Validation successful
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = validation;
