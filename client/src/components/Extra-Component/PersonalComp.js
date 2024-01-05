import React from 'react';

const PersonalComp = ({ candidateDetails, changeEvent }) => {
  return (
    <fieldset>
      <legend>Personal Information :</legend>

      <label htmlFor='CNAME'>Candidate Name:</label>
      <input
        type='text'
        id='CNAME'
        name='CNAME'
        required
        value={candidateDetails.CNAME}
        onChange={changeEvent}
      />

      <label htmlFor='FNAME'>Father's Name:</label>
      <input
        type='text'
        id='FNAME'
        name='FNAME'
        required
        value={candidateDetails.FNAME}
        onChange={changeEvent}
      />

      <label htmlFor='MNAME'>Mother's Name:</label>
      <input
        type='text'
        id='MNAME'
        name='MNAME'
        required
        value={candidateDetails.MNAME}
        onChange={changeEvent}
      />
      <label htmlFor='APPNO'>Application Number:</label>

      <input
        type='text'
        id='APPNO'
        name='APPNO'
        required
        value={candidateDetails.APPNO}
        onChange={changeEvent}
      />
      <label htmlFor='RANK'>JEE rank:</label>
      <input
        type='text'
        id='RANK'
        name='RANK'
        required
        value={candidateDetails.RANK}
        onChange={changeEvent}
      />

      <label htmlFor='DOB'>Date of Birth:</label>
      <input
        type='date'
        id='DOB'
        name='DOB'
        required
        min='2000-01-01'
        max='2007-12-31'
        value={candidateDetails.DOB}
        onChange={changeEvent}
      />

      <label htmlFor='GENDER'>Gender:</label>
      <select
        id='GENDER'
        name='GENDER'
        required
        value={candidateDetails.GENDER}
        onChange={changeEvent}>
        <option value=''>--Select--</option>

        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
      </select>

      <label htmlFor='CAT'>Category:</label>
      <select
        id='CAT'
        name='CAT'
        required
        value={candidateDetails.CAT}
        onChange={changeEvent}>
        <option value=''>--Select--</option>
        <option value='General'>General</option>
        <option value='OBC- NCL'>OBC</option>
        <option value='SC'>SC</option>
        <option value='ST'>ST</option>
      </select>
    </fieldset>
  );
};

export default PersonalComp;
