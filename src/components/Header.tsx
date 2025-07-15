import { useState } from "react";

type HeaderProps = {
  title?: string;
  description?: string;
};

const navbarItems = ["Home", "About", "Contact"];

const Header = ({
  title = "Posts Feed",
  description = "Browse through the latest posts",
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      handleMenuToggle();
    }
  };

  return (
    <header className="bg-red-500 border-b border-blue-200 py-4">
      <div className="mx-auto max-w-4xl px-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {description && <p className="text-blue-100">{description}</p>}
        </div>

        <nav>
          <div className="md:hidden">
            <button
              type="button"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
              className="p-2 rounded-md text-white hover:text-white/80 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleMenuToggle}
              onKeyDown={handleKeyDown}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            {isMenuOpen && (
              <div
                id="mobile-menu"
                className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 py-2 shadow-lg"
              >
                {navbarItems.map((item) => (
                  <a
                    key={item}
                    href="/"
                    className="block px-4 py-2 text-white"
                    tabIndex={0}
                    aria-label="Home"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:block">
            <div className="flex space-x-4">
              {navbarItems.map((item) => (
                <a
                  key={item}
                  href="/"
                  className="block px-4 py-2 text-white"
                  tabIndex={0}
                  aria-label="Home"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
