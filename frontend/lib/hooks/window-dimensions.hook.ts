import { useState, useEffect } from 'react';


// fix this for ssr
function getWindowDimensions() {
  if(typeof window !== 'undefined') {
    return { width: window.innerWidth, height: window.innerHeight }
  }
  else return { width: 0, height: 0 }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}