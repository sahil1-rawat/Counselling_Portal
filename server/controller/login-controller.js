const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { CandidateDetails } = require('../model/schema');
const login = async (req, res) => {
  try {
    const { EMAIL, PASSWORD } = req.body;
    const candidateExist = await CandidateDetails.findOne({ EMAIL });
    if (!candidateExist) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }
    const isValidPassword = await bcrypt.compare(
      PASSWORD,
      candidateExist.PASSWORD
    );
    if (isValidPassword) {
      return res.status(200).json({
        msg: 'login successful',
        token: await candidateExist.generateToken(),
        candidate: candidateExist,
        _id: candidateExist._id.toString(),
      });
    } else {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = login;
