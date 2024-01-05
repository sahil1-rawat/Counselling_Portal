const profile = async (req, res) => {
  try {
    const candidateData = req.user;
    return res.status(200).json({ candidateData });
  } catch (error) {
    console.log(
      `🚀🧑‍💻 ~ file: Profile-controller.js:6 ~ profile ~ error:`,
      error
    );
  }
};
module.exports = profile;
