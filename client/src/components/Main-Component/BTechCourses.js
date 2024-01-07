import React, { useState, useEffect } from 'react';
import '../styles/BTechCourses.css';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const BTechCourses = () => {
  const url = process.env.REACT_APP_URL;

  const { candidate, isCourses, setIsCourses } = useAuth();

  const availableCourses = [
    'Computer Science',
    'Mechanical',
    'Information Technology',
    'Civil',
    'Electronic and Communication',
    'Chemical',
    'Robotics',
    'Electrical',
    'Biotechnology',
    'Automobile',
    'Food Technology',
  ];
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    setIsCourses(candidate.courses.length !== 0);
  }, [candidate.courses.length, setIsCourses]);

  const handleSelection = (event) => {
    const selectedOption = event.target.value;
    if (
      selectedCourses.length < 3 &&
      !selectedCourses.includes(selectedOption)
    ) {
      setSelectedCourses((prevCourses) => [...prevCourses, selectedOption]);
    }
  };

  const removeFromSelected = (index) => {
    const updatedCourses = [...selectedCourses];
    updatedCourses.splice(index, 1);
    setSelectedCourses(updatedCourses);
  };

  const saveCourses = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/select-course/${candidate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courses: selectedCourses,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('course updated!');
        setIsCourses(true);
        candidate.courses = selectedCourses;
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!isCourses ? (
        <form onSubmit={saveCourses}>
          <div className='btech-course-layout'>
            <div className='left-side'>
              <p className='picker-heading'>Available Btech Courses:</p>
              <select
                size='4'
                multiple
                value={selectedCourses}
                onChange={handleSelection}
                disabled={selectedCourses.length === 3}>
                {availableCourses.map((course, index) => (
                  <option key={index} value={course} onClick={handleSelection}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
            <div className='right-side'>
              <p className='picker-heading'>Selected BTech Courses:</p>
              <select size='4' multiple>
                {selectedCourses.map((course, index) => (
                  <option key={index} onClick={() => removeFromSelected(index)}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type='submit'
            className='save'
            disabled={selectedCourses.length !== 3}>
            Save
          </button>
        </form>
      ) : (
        <ol>
          {candidate.courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ol>
      )}
    </>
  );
};

export default BTechCourses;
