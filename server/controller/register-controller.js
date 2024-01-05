const express = require('express');
const router = express.Router();
const { CandidateDetails, JEE } = require('../model/schema');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const { deleteFiles } = require('./deletedFiles');
const validation = require('../middleware/validation');
const register = async (req, res, next) => {
  try {
    let {
      APPNO,
      CNAME,
      FNAME,
      MNAME,
      RANK,
      GENDER,
      CAT,
      DOB,
      EMAIL,
      PHONE,
      domicile,
      address1,
      address2,
      city,
      state,
      district,
      zip,
      PASSWORD,
      CONFIRM_PASSWORD,
      security_question,
      security_answer,
    } = req.body;
    const pattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    DOB = moment(DOB).format('DD-MM-YYYY');
    const candidateExist = await CandidateDetails.findOne({
      $or: [{ APPNO }, { EMAIL }],
    });
    const JeeCandidate = await JEE.findOne({
      $and: [
        { APPNO },
        { CNAME },
        { FNAME },
        { MNAME },
        { GENDER },
        { CAT },
        { DOB },
      ],
    });

    const validationResult = await validation(
      {
        PASSWORD,
        CONFIRM_PASSWORD,
        JeeCandidate,
        candidateExist,
        pattern,
        files: req.files,
      },
      res,
      deleteFiles
    );

    if (validationResult) {
      return validationResult;
    }
    const imageName = req.files.image[0].filename;
    const signName = req.files.sign[0].filename;
    const thumbName = req.files.thumb[0].filename;
    const hash_password = await bcrypt.hash(PASSWORD, 10);
    const hash_ans = await bcrypt.hash(security_answer, 10);
    const candidateCreated = await CandidateDetails.create({
      APPNO,
      CNAME,
      FNAME,
      MNAME,
      RANK,
      DOB,
      GENDER,
      CAT,
      EMAIL,
      PHONE,
      domicile,
      address1,
      address2,
      city,
      state,
      district,
      zip,
      PASSWORD: hash_password,
      image: imageName,
      sign: signName,
      thumb: thumbName,
      security_question,
      security_answer: hash_ans,
    });
    res.status(201).json({
      msg: 'registration successful',
      token: await candidateCreated.generateToken(),
      _id: candidateCreated._id.toString(),
    });
  } catch (error) {
    console.log('internal server error');
    res.status(500).json({ error: 'Internal server error' });
    if (req.files) {
      await deleteFiles(req.files);
    }
  }
};
module.exports = register;
