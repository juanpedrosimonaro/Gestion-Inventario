import { useState, useEffect } from "react";

function useLocalStorage(getIfEmpty, key, callback) {
  const [value, setValue] = useState(async function () {
    const storedValue = localStorage.getItem(key);
    const defaultValue = await fetch(getIfEmpty).then(res=>callback(res.json()));
    console.log(defaultValue);
    return storedValue ? JSON.parse(storedValue) : defaultValue ;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}

export default useLocalStorage
