'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Music2 } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-purple-600 font-medium' : 'text-gray-600 hover:text-purple-600';
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Music2 className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">Artistly</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`transition-colors ${isActive('/')}`}>
              Home
            </Link>
            <Link href="/artists" className={`transition-colors ${isActive('/artists')}`}>
              Browse Artists
            </Link>
            <Link href="/onboard" className={`transition-colors ${isActive('/onboard')}`}>
              Join as Artist
            </Link>
            <Link href="/dashboard" className={`transition-colors ${isActive('/dashboard')}`}>
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/onboard">
              <Button variant="outline" size="sm">
                Register
              </Button>
            </Link>
            <Link href="/artists">
              <Button size="sm">
                Find Artists
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden py-4 border-t">
          <div className="flex flex-col space-y-2">
            <Link href="/" className={`py-2 transition-colors ${isActive('/')}`}>
              Home
            </Link>
            <Link href="/artists" className={`py-2 transition-colors ${isActive('/artists')}`}>
              Browse Artists
            </Link>
            <Link href="/onboard" className={`py-2 transition-colors ${isActive('/onboard')}`}>
              Join as Artist
            </Link>
            <Link href="/dashboard" className={`py-2 transition-colors ${isActive('/dashboard')}`}>
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}