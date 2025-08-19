'use Client'
import { useAppContext } from '@/context/AppContext';
import { useState, useEffect, useRef, use } from 'react';
import Image from 'next/image';
import { UserButton, useClerk } from '@clerk/nextjs';
import {assets, CartIcon, BagIcon } from '@/assets/assets';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const searchInputRef = useRef(null);
  const { router,user } = useAppContext();
  const {openSignIn} = useClerk();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) && 
        mobileMenuButtonRef.current && 
        !mobileMenuButtonRef.current.contains(event.target))
      {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Focus search input when clicking search icon on mobile
  const focusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <>
      <nav className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Mobile Search */}
            <div className="flex items-center space-x-4 md:space-x-0">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold text-blue-400">
                  🛍️ ShopLogo
                </div>
              </div>

              {/* Mobile Search - Always visible */}
              <div className="md:hidden flex-1 max-w-xs ml-4">
                <div className="relative">
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="Search..." 
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                  <div 
                    className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
                    onClick={focusSearch}
                  >
                    <span className="text-gray-400">🔍</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            
            <div className="hidden md:flex items-center space-x-6 flex-1 max-w-3xl mx-8">
              {/* Search Bar */}
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <span className="text-gray-400">🔍</span>
                  </div>
                </div>
              </div>

              {/* Login Dropdown */}
              <div>
              <ul className="hidden md:flex items-center gap-4 ">
        {user
        ?<>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Action label="my Orders" labelIcon={<BagIcon/>} onClick={() => router.push('/my-orders')}/>
          </UserButton.MenuItems>     
        </UserButton>
        </>
        :<button onClick={openSignIn} className="flex items-center space-x-1 px-3 py-2 rounded-md text-white hover:bg-gray-700 transition-colors">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>}
      </ul>
</div>
              {/* Cart */}
              <button className="flex items-center space-x-1 px-3 py-2 rounded-md text-white hover:bg-gray-700 transition-colors">
                <span className="text-xl">🛒</span>
                <span className="hidden lg:inline">Cart</span>
              </button>

              {/* Become a Seller */}
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                Become a Seller
              </button>

              {/* Three Dots Menu */}
              <div className="relative group">
                <button className="flex items-center px-3 py-2 rounded-md text-white hover:bg-gray-700 transition-colors">
                  <span className="text-xl">⋯</span>
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-gray-700 rounded-lg shadow-xl border border-gray-600 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <div className="py-2">
                    <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-600 transition-colors">
                      <span className="mr-3">🔔</span>
                      <span>Notification Preferences</span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-600 transition-colors">
                      <span className="mr-3">🎧</span>
                      <span>24×7 Customer Care</span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-600 transition-colors">
                      <span className="mr-3">📢</span>
                      <span>Advertise</span>
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-600 transition-colors">
                      <span className="mr-3">📱</span>
                      <span>Download App</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Right Side - Login and Menu Button */}
            <div className="flex items-center space-x-4 md:hidden">
              {/* Mobile Login Button */}
              <button className="flex items-center px-3 py-2 rounded-md hover:bg-gray-700 transition-colors">
                <span className="text-xl">👤</span>
              </button>

              {/* Mobile menu button */}
              <button 
                ref={mobileMenuButtonRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block w-5 h-0.5 bg-white mb-1 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`block w-5 h-0.5 bg-white mb-1 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-5 h-0.5 bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            ref={mobileMenuRef}
            className={`md:hidden bg-gray-800 border-t border-gray-700 overflow-hidden transition-all duration-300 ${
              mobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'
            }`}
          >
            <div className="px-4 py-4 space-y-4">
              {/* Expanded Mobile Search (shown when focused) */}
              {searchFocused && (
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ref={searchInputRef}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <span className="text-gray-400">🔍</span>
                  </div>
                </div>
              )}

              {/* Mobile Login Section */}
              <div className="border-t border-gray-700 pt-4">
                <div className="text-sm font-medium text-gray-300 mb-2">👤 Account</div>
                <div className="space-y-2 pl-4">
                  <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                    <span className="mr-3">🆕</span>
                    <span>New Customer? Sign Up</span>
                  </a>
                  <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                    <span className="mr-3">👤</span>
                    <span>My Profile</span>
                  </a>
                  <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                    <span className="mr-3">📦</span>
                    <span>Orders</span>
                  </a>
                  <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                    <span className="mr-3">❤️</span>
                    <span>Wishlist</span>
                  </a>
                  <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                    <span className="mr-3">🏆</span>
                    <span>Rewards</span>
                  </a>
                  <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                    <span className="mr-3">🎁</span>
                    <span>Gift Cards</span>
                  </a>
                </div>
              </div>

              {/* Mobile Cart & Seller */}
              <div className="border-t border-gray-700 pt-4 space-y-3">
                <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                  <span className="mr-3 text-xl">🛒</span>
                  <span>Cart</span>
                </a>
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors text-left">
                  Become a Seller
                </button>
              </div>

              {/* Mobile More Options */}
              <div className="border-t border-blue-700 pt-4">
                <div className="text-sm font-medium text-gray-300 mb-2">⋯ More</div>
                <div className="space-y-2 pl-4">
                  <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                    <span className="mr-3">🔔</span>
                    <span>Notification Preferences</span>
                  </a>
                  <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                    <span className="mr-3">🎧</span>
                    <span>24×7 Customer Care</span>
                  </a>
                  <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                    <span className="mr-3">📢</span>
                    <span>Advertise</span>
                  </a>
                  <a href="#" className="flex items-center py-2 text-gray-300 hover:text-white">
                    <span className="mr-3">📱</span>
                    <span>Download App</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;