const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600 w-full">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Armour Store Logo"
            />
            <span className="text-white text-lg font-semibold">
              Armour Store
            </span>
          </div>
          <ul className="flex space-x-4 mt-4 md:mt-0">
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-4 text-gray-400 text-sm text-center">
          © 2025 Armour Store. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
