import React from 'react'
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import SignUpPage from '../pages/SignUp';

function ButtonComponent() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-x-4">
      <button className="btn btn-neutral">Sign In</button>
      <button onClick={() => navigate(<SignUpPage></SignUpPage>)} className="btn btn-neutral btn-outline">Sign Up</button>
    </div>
  );
}

export default ButtonComponent;
