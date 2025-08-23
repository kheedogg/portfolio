'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // 다크모드 토글 로직 추후 구현
  }

  return (
    <header className="sticky top-0 z-50 bg-gray-1 border-b border-gray-6">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-semibold text-gray-12">
              김도희
            </span>
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-sm text-gray-11 hover:text-gray-12 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/blog" 
              className="text-sm text-gray-11 hover:text-gray-12 transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className="text-sm text-gray-11 hover:text-gray-12 transition-colors"
            >
              About
            </Link>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-11 hover:text-gray-12 hover:bg-gray-3 rounded-lg transition-all"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}