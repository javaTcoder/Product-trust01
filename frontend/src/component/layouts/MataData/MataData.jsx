import React, { useEffect } from 'react'

function MataData({title}) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}

export default MataData