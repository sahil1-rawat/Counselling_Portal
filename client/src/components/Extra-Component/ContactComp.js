import React from 'react';
import { preventCopyPaste } from '../Extra-Files/extraFile';

const ContactComp = ({ candidateDetails, changeEvent }) => {
  return (
    <>
      <fieldset>
        <legend>Contact Information :</legend>
        <label htmlFor='EMAIL'>Email:</label>
        <input
          type='email'
          id='EMAIL'
          name='EMAIL'
          required
          value={candidateDetails.EMAIL}
          onChange={changeEvent}
          onPaste={preventCopyPaste}
          onCopy={preventCopyPaste}
          onCut={preventCopyPaste}
        />

        <label htmlFor='PHONE'>Phone Number:</label>
        <input
          type='tel'
          id='PHONE'
          name='PHONE'
          pattern='[0-9]{10}'
          required
          title='Phone Number must be exactly 10 digits'
          value={candidateDetails.PHONE}
          onChange={changeEvent}
          onPaste={preventCopyPaste}
          onCopy={preventCopyPaste}
          onCut={preventCopyPaste}
        />
      </fieldset>
    </>
  );
};

export default ContactComp;
