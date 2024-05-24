import { useState, useEffect } from "react";

function useLocalStorage(key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue  ? JSON.parse(storedValue) : [];
  });

  useEffect(
    function () {
      debugger
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}

export default useLocalStorage
