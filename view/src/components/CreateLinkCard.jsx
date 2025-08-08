import axios from 'axios';
import React, { useState } from 'react'
import { LinkIcon } from '@heroicons/react/24/outline';

function CreateLinkCard( { onClose } ) {
    const [originalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const handleClick = () =>{
        axios.post('http://localhost:5000/url', { url : originalUrl  })
  .then(response => {
    // success handler
    const shortUrl = response.data.message;
    setShortUrl("http://localhost:5000/"+shortUrl)
  })
  .catch(error => {
    // error handler
    console.error('Error:', error);
  });

    }
  return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
                 <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 text-xl font-bold">&times;</button>
      <div className="mb-4">
        <input
          type='text'
          placeholder='Enter link'
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="border border-black p-2"
        />
        <button onClick={handleClick} className="btn btn-neutral ml-2">
          generate
        </button>
      </div>

      {shortUrl && (
        <div className="mt-4">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline"
          >
            {shortUrl}
          </a>
        </div>
      )}
      </div>
    </div>
  )
}

export default CreateLinkCard
