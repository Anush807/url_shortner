// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // track init

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setUser({ token });
//     }
//     setLoading(false); // finished checking
//   }, []);

//   const signin = (token) => {
//     localStorage.setItem("token", token);
//     setUser({ token });
//   };

//   const signout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, signin, signout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
