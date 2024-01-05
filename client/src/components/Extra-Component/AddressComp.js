import React from 'react';

const AddressComp = ({ candidateDetails, changeEvent }) => {
  return (
    <>
      <fieldset>
        <legend>Address Information:</legend>
        <label htmlFor='domicile' id='domicile'>
          Domicile (Uttarakhand or not):
        </label>
        <input
          type='radio'
          id='domicile_yes'
          name='domicile'
          value='yes'
          required
          checked={candidateDetails.domicile === 'yes'}
          onChange={changeEvent}
        />
        <label htmlFor='domicile_yes'>Yes</label>
        <input
          type='radio'
          id='domicile_no'
          name='domicile'
          value='no'
          checked={candidateDetails.domicile === 'no'}
          onChange={changeEvent}
        />
        <label htmlFor='domicile_no'>No</label>
        <label htmlFor='address1'>Address 1:</label>
        <input
          type='text'
          id='address1'
          name='address1'
          required
          value={candidateDetails.address1}
          onChange={changeEvent}
        />

        <label htmlFor='address2'>Address 2:</label>
        <input
          type='text'
          id='address2'
          name='address2'
          value={candidateDetails.address2}
          onChange={changeEvent}
        />

        <label htmlFor='city'>City:</label>
        <input
          type='text'
          id='city'
          name='city'
          required
          value={candidateDetails.city}
          onChange={changeEvent}
        />

        <label htmlFor='district'>District:</label>
        <input
          type='text'
          id='district'
          name='district'
          required
          value={candidateDetails.district}
          onChange={changeEvent}
        />
        <label htmlFor='state'>State:</label>
        <input
          type='text'
          id='state'
          name='state'
          disabled={candidateDetails.domicile === 'yes'}
          required
          value={candidateDetails.state}
          onChange={changeEvent}
        />

        <label htmlFor='zip'>Zip Code:</label>
        <input
          type='text'
          id='zip'
          name='zip'
          pattern='[0-9]{6}'
          title='Zip Code must be exactly 6 digits'
          required
          value={candidateDetails.zip}
          onChange={changeEvent}
        />
      </fieldset>
    </>
  );
};

export default AddressComp;
