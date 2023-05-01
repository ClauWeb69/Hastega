import React from 'react';

function Navbar() {
  return (
    <nav className="bg-gray-800 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold text-lg">Hastega</div>
        <ul className="flex">
          <li className="mx-4">
            <a href="/Auth/Home" className="text-gray-300 hover:text-white">Home</a>
          </li>
          <li className="mx-4">
            <a href="/Auth/Library" className="text-gray-300 hover:text-white">Library</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;