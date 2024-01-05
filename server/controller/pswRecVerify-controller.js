const { CandidateDetails } = require('../model/schema');
const bcrypt = require('bcryptjs');
const pswRecVerify = async (req, res) => {
  const { EMAIL, security_question, security_answer } = req.body;
  const candidateExist = await CandidateDetails.findOne({ EMAIL });
  const isValid = await bcrypt.compare(
    security_answer,
    candidateExist.security_answer
  );
  console.log(isValid);
  if (!candidateExist) return res.status(400).json({ msg: 'Invalid EMAIL' });
  else if (!isValid || security_question !== candidateExist.security_question) {
    return res.status(400).json({ msg: 'Invalid security information. ' });
  } else {
    return res.status(200).json({
      msg: 'go to reset password page',
      token: await candidateExist.generateToken(),
      _id: candidateExist._id.toString(),
    });
  }
};
module.exports = pswRecVerify;
