import { useState, useEffect } from 'react';

// Custom hook that prevents uppercase letter when user typing
export default function InputField() {
  const [ input, setInput ] = useState("");

  useEffect(() => {
    if (input.length > 1) {
      if (input[input.length - 1] === input[input.length - 1].toUpperCase()) {
        setInput(input.toLowerCase());
      }
    } else if (input.length === 1) {
      if (input[0] === input[0].toUpperCase()) {
        setInput(input.toLowerCase());
      }
    }
  }, [input])

  return [ input, setInput ];
}