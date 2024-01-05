const { CandidateDetails } = require('../model/schema');

const paymentSuccess = async (req, res) => {
  try {
    const { id } = req.params;
    const status = await CandidateDetails.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    status.paymentStatus = true;
    await status.save();
    res.status(200).json({ msg: 'Payment success handled in the backend' });
  } catch (error) {
    console.log(error);
  }
};
module.exports = paymentSuccess;
