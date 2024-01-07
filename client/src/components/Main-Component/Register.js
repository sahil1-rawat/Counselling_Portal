import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Register.css';
import PersonalComp from '../Extra-Component/PersonalComp';
import AddressComp from '../Extra-Component/AddressComp';
import ContactComp from '../Extra-Component/ContactComp';
import PswComp from '../Extra-Component/PswComp';
import UploadDocsComp from '../Extra-Component/UploadDocsComp';
import {
  initialText,
  initialFiles,
  setFormData,
  handleChange,
} from '../Extra-Files/extraFile';

const Register = () => {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_URL;

  // References to input elements

  const imageInputRef = useRef(null);
  const signInputRef = useRef(null);
  const thumbInputRef = useRef(null);

  // State variables for candidate information and files

  const [candidate, setCandidate] = useState(initialText);
  const [file, setFiles] = useState(initialFiles);

  // Function to handle changes in input fields for candidate details

  const handleInput = (e) => {
    let { name, value } = e.target;
    handleChange(name, value, candidate, setCandidate);
  };

  // Function to handle file input changes for document uploads

  const handleFiles = (e) => {
    const { name, files } = e.target;
    setFiles({
      ...file,
      [name]: files[0],
    });
  };

  // Function to handle form submission, sending data to the server for candidate registration

  const postData = async (e) => {
    e.preventDefault();

    // Construct FormData object with candidate data and files

    const formData = setFormData(candidate, file);

    try {
      // Send POST request to the server for candidate registration

      const res = await fetch(`${url}/register`, {
        method: 'POST',
        body: formData, // Set the request body as FormData
      });

      // Parse response data as JSON

      const data = await res.json();

      // Handle response based on success or failure

      if (res.ok) {
        // Display success message and navigate to login page on successful registration

        toast.success('Registration confirmed');
        navigate('/login');
      } else {
        toast.error(`${data.error}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      resetForm(); // Reset the form fields regardless of success or failure
    }
  };

  // Function to reset form fields and input values after form submission or cancellation

  const resetForm = () => {
    // Reset candidate data to initial state (initialText) and files to initialFiles

    setCandidate(initialText);
    setFiles(initialFiles);

    // Clear input values by accessing the input references and setting their values to an empty string

    if (
      imageInputRef.current &&
      signInputRef.current &&
      thumbInputRef.current
    ) {
      imageInputRef.current.value = '';
      signInputRef.current.value = '';
      thumbInputRef.current.value = '';
    }
  };

  return (
    <>
      <div className='reg-container'>
        <h3>Registration for Candidate</h3>
        <form method='POST' onSubmit={postData} onReset={resetForm}>
          {/* Components for personal, address, contact, and password information */}
          <PersonalComp
            candidateDetails={candidate}
            changeEvent={handleInput}
          />
          <AddressComp candidateDetails={candidate} changeEvent={handleInput} />
          <ContactComp candidateDetails={candidate} changeEvent={handleInput} />
          <PswComp candidateDetails={candidate} changeEvent={handleInput} />

          {/* component for uploading documents */}
          <UploadDocsComp
            changeEvent={handleFiles}
            imageRef={imageInputRef}
            signRef={signInputRef}
            thumbRef={thumbInputRef}
          />

          <div className='buttons'>
            <input type='submit' value='Register' />
            <input type='reset' value='Reset' />
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
