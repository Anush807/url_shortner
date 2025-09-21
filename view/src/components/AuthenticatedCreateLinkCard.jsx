// import axios from 'axios';
// import React, { useState } from 'react'
// import { LinkIcon } from '@heroicons/react/24/outline';
// import { Copy, Check } from 'lucide-react';

// function AuthenticatedCreateLinkCard( { onClose } ) {
//     const [originalUrl, setOriginalUrl] = useState("");
//     const [shortUrl, setShortUrl] = useState("");
//      const [copied, setCopied] = useState(false);
//     const handleClick = () =>{
//        const token = localStorage.getItem("token");
//         axios.post('http://localhost:5000/dashboard/generatelink', 
//             { url : originalUrl  },
// {
//     headers: {
//         Authorization: `Bearer ${token}`, // attach token here
//       },}
//             )
//   .then(response => {
//     // success handler
//     const shortUrl = response.data.shortUrl;
//     setShortUrl("http://localhost:5000/s/"+shortUrl)
//   })
//   .catch(error => {
//     // error handler
//     console.error('Error:', error);
//   });
  
  
//     }
//     const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText(shortUrl);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
//     } catch (err) {
//       console.error('Failed to copy: ', err);
//     }
//   };
//   return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
//             <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
//                  <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 text-xl font-bold">&times;</button>
//       <div className="mb-4">
//         <input
//           type='text'
//           placeholder='Enter link'
//           onChange={(e) => setOriginalUrl(e.target.value)}
//           className="border border-black p-2"
//         />
//         <button onClick={handleClick} className="btn btn-neutral ml-2">
//           generate
//         </button>
//       </div>

//        {shortUrl && (
//         <div className="mt-4 flex items-center gap-2">
//           <a
//             href={shortUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-black underline"
//           >
//             {shortUrl}
//           </a>
//           <button
//             onClick={handleCopy}
//             className="p-1 hover:bg-gray-100 rounded transition-colors duration-200 flex items-center justify-center"
//             title={copied ? "Copied!" : "Copy to clipboard"}
//           >
//             {copied ? (
//               <Check className="w-4 h-4 text-black" />
//             ) : (
//               <Copy className="w-4 h-4 text-gray-600 hover:text-gray-800" />
//             )}
//           </button>
//           {copied && (
//             <span className="text-sm text-black font-medium">Copied!</span>
//           )}
//         </div>
//       )}
//       </div>
//     </div>
//   )
// }

// export default AuthenticatedCreateLinkCard
