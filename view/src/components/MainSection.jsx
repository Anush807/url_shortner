import React, { useState } from "react";
import axios from "axios";
import { LinkIcon, ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline";

function MainSection() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (!originalUrl.trim()) return;

    axios
      .post("http://localhost:5000/url", { url: originalUrl })
      .then((response) => {
        const shortUrl = response.data.message;
        setShortUrl("http://localhost:5000/" + shortUrl);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2s
    });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      {/* Background Grid */}
      <div
        className="absolute inset-0 -z-10 bg-white 
        bg-[linear-gradient(to_right,#f8f8f8_1px,transparent_1px),
            linear-gradient(to_bottom,#f8f8f8_1px,transparent_1px)] 
        bg-[size:6rem_4rem] 
        [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
      ></div>

      {/* Card */}
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl p-10 flex flex-col items-center text-center space-y-6">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
          Shorten your links <span className="text-neutral-700">instantly</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-md mx-auto">
          Create clean and shareable links in seconds. Fast, simple, and free.
        </p>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Paste your long URL here..."
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 
                       focus:outline-none focus:ring-2 focus:ring-neutral-800"
          />
          <button
            onClick={handleClick}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 text-white px-6 py-3 
                       font-medium shadow-md transition-all duration-200 
                       hover:shadow-lg hover:scale-[1.01] active:scale-[0.98]"
          >
            <LinkIcon className="w-5 h-5" />
            Shorten
          </button>
        </div>

        {/* Short URL box */}
        {shortUrl && (
          <div
            className="mt-6 w-full flex items-center justify-between bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 
                        animate-fadeIn shadow-sm"
          >
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-medium truncate max-w-[80%] hover:underline"
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className="ml-2 text-gray-600 hover:text-gray-900 transition"
            >
              {copied ? (
                <CheckIcon className="w-5 h-5 text-green-600" />
              ) : (
                <ClipboardIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainSection;
