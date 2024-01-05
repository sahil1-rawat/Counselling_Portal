//! securityQuestions for PswComp.js and PswRecVerify.js

const securityQuestions = [
  "What is your mother's maiden name?",
  "What is your best friend's name?",
  'What is the name of your first pet?',
  'What is your favorite childhood cartoon character?',
  'What is your favorite outdoor activity?',
  'What is your favorite vacation destination?',
  'What is your favorite movie?',
];

//! initalText and initialFiles for Register.js
const initialText = {
  APPNO: '',
  CNAME: '',
  FNAME: '',
  MNAME: '',
  RANK: '',
  DOB: '',
  GENDER: '',
  CAT: '',
  EMAIL: '',
  PHONE: '',
  PASSWORD: '',
  CONFIRM_PASSWORD: '',
  domicile: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  district: '',
  zip: '',
  security_question: '',
  security_answer: '',
};
const initialFiles = {
  image: null,
  sign: null,
  thumb: null,
};

//! formData for Register.js file (appending data in form)
const setFormData = (candidate, file) => {
  const formData = new FormData();
  formData.append('APPNO', candidate.APPNO);
  formData.append('CNAME', candidate.CNAME);
  formData.append('FNAME', candidate.FNAME);
  formData.append('MNAME', candidate.MNAME);
  formData.append('RANK', candidate.RANK);
  formData.append('DOB', candidate.DOB);
  formData.append('GENDER', candidate.GENDER);
  formData.append('CAT', candidate.CAT);
  formData.append('domicile', candidate.domicile);
  formData.append('address1', candidate.address1);
  formData.append('address2', candidate.address2);
  formData.append('state', candidate.state);
  formData.append('city', candidate.city);
  formData.append('district', candidate.district);
  formData.append('zip', candidate.zip);
  formData.append('EMAIL', candidate.EMAIL);
  formData.append('PHONE', candidate.PHONE);
  formData.append('PASSWORD', candidate.PASSWORD);
  formData.append('CONFIRM_PASSWORD', candidate.CONFIRM_PASSWORD);
  formData.append('security_question', candidate.security_question);
  formData.append('security_answer', candidate.security_answer);
  formData.append('image', file.image);
  formData.append('sign', file.sign);
  formData.append('thumb', file.thumb);
  return formData;
};

//! handleChange function for changing the state for Register.js
const handleChange = (name, value, candidate, setCandidate) => {
  if (name === 'domicile') {
    if (value === 'yes') {
      setCandidate({
        ...candidate,
        domicile: 'yes',
        state: 'Uttarakhand',
      });
    } else {
      setCandidate({ ...candidate, domicile: 'no', state: '' });
    }
  } else if (name === 'APPNO') {
    value = value.replace(/\D/g, '').slice(0, 12);
    setCandidate({
      ...candidate,
      [name]: value,
    });
  } else if (name === 'PHONE') {
    value = value.replace(/\D/g, '').slice(0, 10);
    setCandidate({
      ...candidate,
      [name]: value,
    });
  } else if (name === 'RANK') {
    value = value.replace(/\D/g, '').slice(0, 5);
    setCandidate({
      ...candidate,
      [name]: value,
    });
  } else {
    if (['CNAME', 'FNAME', 'MNAME'].includes(name)) {
      value = value.replace(/[^A-Za-z\s]/g, '').toUpperCase();
    } else if (name === 'state' || name === 'city' || name === 'district') {
      value = value
        .replace(/[^A-Za-z\s]/g, '')
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } else if (name === 'zip') {
      value = value.replace(/\D/g, '').slice(0, 6);
    }
    setCandidate({
      ...candidate,
      [name]: value,
    });
  }
};
const preventCopyPaste = (event) => {
  event.preventDefault();
};
export {
  securityQuestions,
  initialText,
  initialFiles,
  setFormData,
  handleChange,
  preventCopyPaste,
};
