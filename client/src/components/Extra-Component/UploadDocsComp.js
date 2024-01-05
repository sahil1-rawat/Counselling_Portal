import React from 'react';

const UploadDocsComp = ({ changeEvent, imageRef, signRef, thumbRef }) => {
  return (
    <>
      <fieldset>
        <legend>Upload Documents:</legend>
        {/* <!-- Document upload fields --> */}
        <label htmlFor='photo'>Upload Photo:</label>
        <input
          type='file'
          id='user-image'
          name='image'
          accept='image/*'
          required
          onChange={changeEvent}
          ref={imageRef}
        />

        <label htmlFor='sign'>Upload Signature:</label>
        <input
          type='file'
          id='user-sign'
          name='sign'
          accept='image/*'
          required
          onChange={changeEvent}
          ref={signRef}
        />
        <label htmlFor='thumb'>Upload thumb Impression:</label>
        <input
          type='file'
          id='user-thumb'
          name='thumb'
          accept='image/*'
          required
          onChange={changeEvent}
          ref={thumbRef}
        />
      </fieldset>
    </>
  );
};

export default UploadDocsComp;
