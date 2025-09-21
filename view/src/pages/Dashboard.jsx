// import React, { useState, useEffect, useRef } from "react";
// import { LinkIcon } from "@heroicons/react/24/outline";
// import axios from "axios";
// import AuthenticatedCreateLinkCard from "../components/AuthenticatedCreateLinkCard";
// import ManageSettingsCard from "../components/ManageSettings";
// import { Clipboard } from "lucide-react";

// function Dashboard() {
//   const [showCreateLink, setShowCreateLink] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [email, setEmail] = useState("User");
//   const [showManageSettings, setShowManageSettings] = useState(false);
//   const [links, setLinks] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);


//   const menuRef = useRef();
//   const token = localStorage.getItem("token");
//   // Fetch email from backend or localStorage
//   useEffect(() => {

//     if (token) {
//       axios
//         .get("http://localhost:5000/dashboard/user-information", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => setEmail(res.data.message))
//         .catch(() => setEmail("User"));
//     }
//   }, []);

//   // Close menu if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setShowProfileMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleSignOut = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/signin";
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/dashboard/user-information", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }) // backend API
//       .then((res) => {
//         setLinks(res.data.urls || []); // use the urls array from backend
//       })
//       .catch((err) => {
//         console.error("Error fetching links:", err);
//       });
//   }, []);
//   // Check for token when component mounts
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#f9f9f9] px-8 py-8 relative">
//       {/* HEADER */}
//       <header className="flex items-center justify-between mb-8">
//         <div className="text-2xl font-bold text-[#222] tracking-tight">
//           link.li Dashboard
//         </div>

//         {/* Profile Icon */}
//         <div className="relative" ref={menuRef}>
//           <div
//             onClick={() => setShowProfileMenu((prev) => !prev)}
//             className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80"
//           >
//             <span className="text-lg font-bold text-gray-700">
//               {email.charAt(0)}
//             </span>
//           </div>

//           {/* Dropdown Menu */}
//           {showProfileMenu && (
//             <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 z-50">
//               <div className="text-center font-semibold text-[#222]">
//                 {email}
//               </div>
//               <hr className="my-2" />
//               <button
//                 className="w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded"
//                 onClick={() => {
//                   setShowManageSettings(true);
//                   setShowProfileMenu(false);
//                 }}
//               >
//                 Manage Settings
//               </button>
//               <button
//                 onClick={handleSignOut}
//                 className="w-full text-left px-2 py-1 mt-1 text-sm text-red-600 hover:bg-gray-100 rounded"
//               >
//                 Sign Out
//               </button>
//             </div>
//           )}
//         </div>
//       </header>

//       <main>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* YOUR LINKS */}
//           <section className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-lg font-semibold text-[#222] mb-2">Your Links</h2>
//             <div className="mt-2 mb-4 text-gray-500">
//               All your shortened links, stats, and actions in one place.
//             </div>
//             <button
//               onClick={() => setShowCreateLink(true)}
//               className="btn btn-neutral flex items-center gap-2"
//             >
//               <LinkIcon className="w-5 h-5" />
//               Create New Link
//             </button>
//             <div>
//               {showCreateLink && (
//                 <AuthenticatedCreateLinkCard onClose={() => setShowCreateLink(false)} />
//               )}
//             </div>

//             <div className="pt-6">
//   <ul>
//     {links.map((link) => (
//       <li
//         key={link.shorturl}
//         className="flex items-center justify-between py-2 border-b border-[#f0f0f0]"
//       >
//         <div className="flex items-center gap-2">
//           <span
//             className="cursor-pointer text-gray-500 hover:text-gray-700"
//             onClick={async () => {
//               try {
//                 const fullUrl = `http://localhost:5000/s/${link.shorturl}`;
//                 await navigator.clipboard.writeText(fullUrl); // copy to clipboard
//                 toast.success("Copied to clipboard!");
//               } catch (err) {
//                 console.error("Failed to copy:", err);
//                 toast.error("Failed to copy");
//               }
//             }}
//           >
//             <Clipboard size={18} />
//           </span>
//           <span className="truncate text-[#222]">{`http://localhost:5000/s/${link.shorturl}`}</span>
//         </div>
//         <span className="text-xs text-gray-500">{link.clicks} clicks</span>
//       </li>
//     ))}
//   </ul>
// </div>
//           </section>

//           {/* RECENT ACTIVITY */}
//           <section className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
//             <div>
//               <h2 className="text-lg font-semibold text-[#222] mb-2">
//                 Recent Activity
//               </h2>
//               <ul className="space-y-2">
//                 {links.slice(0, 5).map((link) => (
//                   <li key={link.shortId} className="text-gray-700">
//                     You created{" "}
//                     <span className="font-medium text-[#222]">
//                       /{link.shortId}
//                     </span>{" "}
//                     · {new Date(link.createdAt).toLocaleString()}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="mt-6 flex justify-end">
//               <button className="btn btn-neutral btn-outline">View More</button>
//             </div>
//           </section>
//         </div>
//       </main>
//       {showManageSettings && (
//         <ManageSettingsCard
//           onClose={() => setShowManageSettings(false)}
//           currentUsername={email}
//         />
//       )}

//       {/* FOOTER */}
//       <footer className="text-center pt-8 text-gray-400 text-sm">
//         &copy; 2025 link.li · All rights reserved
//       </footer>
//     </div>
//   );
// }

// export default Dashboard;
