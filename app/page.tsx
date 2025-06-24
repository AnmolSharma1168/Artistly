import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Users, Mic, Headphones } from 'lucide-react';

const categories = [
  {
    title: 'Singers',
    description: 'Professional vocalists for any event',
    icon: Music,
    count: '240+ Artists',
  },
  {
    title: 'Dancers',
    description: 'Choreographers and stage performers',
    icon: Users,
    count: '180+ Artists',
  },
  {
    title: 'Speakers',
    description: 'Public and motivational speakers',
    icon: Mic,
    count: '95+ Speakers',
  },
  {
    title: 'DJs',
    description: 'Music producers and DJs',
    icon: Headphones,
    count: '150+ DJs',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gray-100 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Book Artists for Your Event</h1>
          <p className="text-gray-700 mb-6">
            Browse artists and connect with professionals for your upcoming event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/artists">
              <Button size="lg">Explore Artists</Button>
            </Link>
            <Link href="/onboard">
              <Button size="lg">Join as Artist</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(({ title, description, icon: Icon, count }) => (
              <Link key={title} href={`/artists?category=${title.toLowerCase()}`}>
                <Card className="hover:border-gray-400 transition-colors cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="mb-3 flex justify-center">
                      <Icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <h3 className="text-lg font-medium">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                    <p className="text-xs text-gray-500 mt-1">{count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-gray-600 mb-6">
            Join as an artist or explore our dashboard if you are managing bookings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/artists">
              <Button size="lg">Find Artists</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg">Dashboard</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
