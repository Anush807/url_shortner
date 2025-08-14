import React, { useState, useEffect, useRef } from "react";
import { LinkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import CreateLinkCard from "../components/CreateLinkCard";
import ManageSettingsCard from "../components/ManageSettings";


function Dashboard() {
  const [showCreateLink, setShowCreateLink] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [username, setUsername] = useState("User");
  const [showManageSettings, setShowManageSettings] = useState(false);


  const menuRef = useRef();

  // Fetch username from backend or localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/dashboard/user-information", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUsername(res.data.message))
        .catch(() => setUsername("User"));
    }
  }, []);

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] px-8 py-8 relative">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-8">
        <div className="text-2xl font-bold text-[#222] tracking-tight">
          link.li Dashboard
        </div>

        {/* Profile Icon */}
        <div className="relative" ref={menuRef}>
          <div
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80"
          >
            <span className="text-lg font-bold text-gray-700">
              {username.charAt(0)}
            </span>
          </div>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 z-50">
              <div className="text-center font-semibold text-[#222]">
                {username}
              </div>
              <hr className="my-2" />
              <button
                className="w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
                onClick={() => {
                  setShowManageSettings(true);
                  setShowProfileMenu(false);
                }}
              >
                Manage Settings
              </button>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-2 py-1 mt-1 text-sm text-red-600 hover:bg-gray-100 rounded"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MAIN */}
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-[#222] mb-2">
              Your Links
            </h2>
            <div className="mt-2 mb-4 text-gray-500">
              All your shortened links, stats, and actions in one place.
            </div>
            <button
              onClick={() => setShowCreateLink(true)}
              className="btn btn-neutral flex items-center gap-2"
            >
              <LinkIcon className="w-5 h-5" />
              Create New Link
            </button>
            <div>
              {showCreateLink && (
                <CreateLinkCard onClose={() => setShowCreateLink(false)} />
              )}
            </div>
            <div className="pt-6">
              <ul>
                <li className="flex items-center justify-between py-2 border-b border-[#f0f0f0]">
                  <span className="truncate text-[#222]">link.li/abc12345</span>
                  <span className="text-xs text-gray-500">256 clicks</span>
                </li>
                <li className="flex items-center justify-between py-2 border-b border-[#f0f0f0]">
                  <span className="truncate text-[#222]">link.li/xyz9876</span>
                  <span className="text-xs text-gray-500">98 clicks</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#222] mb-2">
                Recent Activity
              </h2>
              <ul className="space-y-2">
                <li className="text-gray-700">
                  You created{" "}
                  <span className="font-medium text-[#222]">/abc12345</span> ·
                  1hr ago
                </li>
                <li className="text-gray-700">
                  Someone clicked{" "}
                  <span className="font-medium text-[#222]">/xyz9876</span> ·
                  34min ago
                </li>
              </ul>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="btn btn-neutral btn-outline">View More</button>
            </div>
          </section>
        </div>
      </main>
      {showManageSettings && (
        <ManageSettingsCard
          onClose={() => setShowManageSettings(false)}
          currentUsername={username}
        />
      )}

      {/* FOOTER */}
      <footer className="text-center pt-8 text-gray-400 text-sm">
        &copy; 2025 link.li · All rights reserved
      </footer>
    </div>
  );
}

export default Dashboard;
