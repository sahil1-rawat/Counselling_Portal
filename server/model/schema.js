const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const CandidateDetailsSchema = new mongoose.Schema(
  {
    image: { type: String, require: true },
    sign: { type: String, require: true },
    APPNO: {
      type: String,
      require: true,
    },
    CNAME: {
      type: String,
      require: true,
    },
    FNAME: {
      type: String,
      require: true,
    },
    MNAME: {
      type: String,
      require: true,
    },
    DOB: {
      type: String,
      require: true,
    },
    GENDER: {
      type: String,
      require: true,
    },
    CAT: {
      type: String,
      require: true,
    },
    RANK: {
      type: Number,
      require: true,
    },
    EMAIL: {
      type: String,
      require: true,
    },
    PHONE: {
      type: String,
      require: true,
    },
    PASSWORD: {
      type: String,
      require: true,
    },
    CONFIRM_PASSWORD: {
      type: String,
      require: true,
    },
    courses: {
      type: [String],
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: String,
      default: 2000,
    },
    security_question: {
      type: String,
      require: true,
    },
    security_answer: {
      type: String,
      require: true,
    },
    thumb: {
      type: String,
      require: true,
    },
    domicile: {
      type: String,
      require: true,
    },
    address1: {
      type: String,
      require: true,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    zip: {
      type: String,
      require: true,
    },
  },
  {
    collection: 'CandidateDetails',
  }
);
// generating token
CandidateDetailsSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        _id: this._id.toString(),
        APPNO: this.APPNO,
        EMAIL: this.EMAIL,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: '30d',
      }
    );
  } catch (error) {
    console.error(error);
  }
};
const CandidateDetails = mongoose.model(
  'CandidateDetails',
  CandidateDetailsSchema
);
const JEE = mongoose.model('jee', {}, 'jee');

module.exports = { CandidateDetails, JEE };
