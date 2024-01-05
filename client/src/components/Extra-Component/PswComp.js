import React from 'react';
import { preventCopyPaste, securityQuestions } from '../Extra-Files/extraFile';
const PswComp = ({ candidateDetails, changeEvent }) => {
  return (
    <>
      <fieldset>
        <legend>Password & Security :</legend>
        <label htmlFor='PASSWORD'>Password:</label>
        <input
          type='PASSWORD'
          id='PASSWORD'
          name='PASSWORD'
          required
          value={candidateDetails.PASSWORD}
          onChange={changeEvent}
          onPaste={preventCopyPaste}
          onCopy={preventCopyPaste}
          onCut={preventCopyPaste}
        />

        <label htmlFor='CONFIRM_PASSWORD'>Confirm Password:</label>
        <input
          type='password'
          id='CONFIRM_PASSWORD'
          name='CONFIRM_PASSWORD'
          required
          value={candidateDetails.CONFIRM_PASSWORD}
          onChange={changeEvent}
          onPaste={preventCopyPaste}
          onCopy={preventCopyPaste}
          onCut={preventCopyPaste}
        />
        <label htmlFor='security_question'>Security Question</label>
        <select
          name='security_question'
          id='security_question'
          required
          value={candidateDetails.security_question}
          onChange={changeEvent}>
          <option value=''>--Select--</option>
          {securityQuestions.map((question, index) => (
            <option key={index} value={question}>
              {question}
            </option>
          ))}
        </select>

        <label htmlFor='security_answer'>Security Answer</label>
        <input
          type='password'
          name='security_answer'
          id='security_answer'
          required
          value={candidateDetails.security_answer}
          onChange={changeEvent}
        />
      </fieldset>
    </>
  );
};

export default PswComp;
