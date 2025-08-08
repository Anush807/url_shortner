import React from 'react'

import { useClerk , SignedIn, SignedOut} from "@clerk/clerk-react";


function ButtonComponent() {
   const { redirectToSignIn } = useClerk();
  const handleClick = () => {
    redirectToSignIn();
  }
  return (
     <div className="flex items-center gap-x-4">
      <button onClick={handleClick} className="btn btn-neutral">Sign In</button>
      <button className="btn btn-neutral btn-outline">Sign Up</button>
    </div>
  )
}

export default ButtonComponent
