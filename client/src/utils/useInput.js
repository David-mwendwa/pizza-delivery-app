import { useState } from 'react';

/**
 * A hook to access react forms
 * @param {*} initialValues parsed as an object
 * @returns an object with updated input values as 'values', resetValues function for resetting to initialValues and handleChange function for handling onChange event
 * @example const { values, handleChange, resetValues } = useInput({
              value1: '',
              value2: false,
              value3: {},
              value4: [],
            });
 */
const useInput = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const resetValues = () => setValues(initialValues);

  const handleChange = (e) => {
    if (e.target.files) {
      setValues({ ...values, [e.target.name]: e.target.files[0] });
    } else setValues({ ...values, [e.target.name]: e.target.value });
  };

  return { values, resetValues, handleChange };
};

export default useInput;
