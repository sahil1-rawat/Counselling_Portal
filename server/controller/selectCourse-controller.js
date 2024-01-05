const { CandidateDetails } = require('../model/schema');
const selectCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const courseSelected = await CandidateDetails.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(201).json({ courseSelected });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = selectCourse;
