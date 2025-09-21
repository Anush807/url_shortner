import React from "react";


function Header() {
  // const navigate = useNavigate();
  // const { user } = useAuth();

  // // handle navigation for protected links
  // const handleNav = (path) => {
  //   if (!user) {
  //     navigate("/signin");
  //   } else {
  //     navigate(path);
  //   }
  // };

  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-gray-800"
          style={{
            fontFamily:
              'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          link.li
        </div>

        {/* Navigation */}
        {/* <div className="flex items-center gap-6">
          <button
            onClick={() => handleNav("/dashboard")}
            className="hover:text-black transition-colors cursor-pointer"
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNav("/links")}
            className="hover:text-black transition-colors cursor-pointer"
          >
            Links
          </button>
          <button
            onClick={() => handleNav("/account")}
            className="hover:text-black transition-colors cursor-pointer"
          >
            Account
          </button>
        </div> */}

        {/* Right button (e.g., Sign In / Profile) */}
      </div>
    </header>
  );
}

export default Header;
