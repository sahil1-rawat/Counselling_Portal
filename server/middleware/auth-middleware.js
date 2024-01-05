const jwt = require('jsonwebtoken');
const { CandidateDetails } = require('../model/schema');
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({ msg: 'No token provided.' });
  }
  const jwtToken = token.replace('Bearer', '').trim();
  try {
    const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);
    // Checking candidate in database
    let candidateData = await CandidateDetails.findOne({
      EMAIL: isVerified.EMAIL,
    }).select({
      PASSWORD: 0,
    });
    // console.log(candidateData);
    req.user = candidateData;
    req.token = token;
    req._id = candidateData._id;
    next();
  } catch (error) {
    // console.log(error);
    return res.status(401).json({ msg: 'Unauthorized. Invalid token' });
  }
};
module.exports = authMiddleware;
