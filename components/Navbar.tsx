'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes, FaFistRaised } from 'react-icons/fa'
import Link from 'next/link'
import LanguageToggle from './LanguageToggle'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: { en: 'Home', ko: '홈' }, href: '/' },
    { name: { en: 'About', ko: '소개' }, href: '#about' },
    { name: { en: 'Approach', ko: '접근 방식' }, href: '#approach' },
    { name: { en: 'Self-Defense', ko: '자기 방어' }, href: '#self-defense' },
    { name: { en: 'Empowerment', ko: '역량 강화' }, href: '#empowerment' },
    { name: { en: 'Contact', ko: '연락처' }, href: '#contact' },
  ]

  return (
    <nav className="bg-black text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <FaFistRaised className="h-8 w-8 text-dancheong-red" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name.en}
                  href={item.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name.en}
                </Link>
              ))}
            </div>
          </div>
          <LanguageToggle />
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name.en}
                href={item.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name.en}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
}

