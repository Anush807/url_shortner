import React, { useState, useEffect } from "react";

function ManageSettingsCard({ onClose, currentUsername }) {
  const [username, setUsername] = useState(currentUsername || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(
    "https://via.placeholder.com/100" // default placeholder
  );

  // Preview profile picture
  useEffect(() => {
    if (profilePic) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPic(reader.result);
      };
      reader.readAsDataURL(profilePic);
    }
  }, [profilePic]);

  const handleSave = () => {
    if (password && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Replace with axios PUT request to backend
    console.log({
      username,
      password,
      profilePic
    });
    alert("Changes saved!");
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Profile picture */}
        <div className="flex justify-center mb-4">
          <label className="relative cursor-pointer">
            <img
              src={previewPic}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="hidden"
            />
            <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-2 py-0.5 rounded-full">
              Edit
            </span>
          </label>
        </div>

        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          Manage Settings
        </h2>

        {/* Change Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Change Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input w-full bg-white border border-black"
          />
        </div>

        {/* Change Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Change Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full bg-white border border-black"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input w-full bg-white border border-black"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="btn btn-outline btn-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn btn-black btn-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageSettingsCard;
