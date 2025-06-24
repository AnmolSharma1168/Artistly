'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Eye,
  Users,
  Calendar,
  DollarSign
} from 'lucide-react';

const artistSubmissions = [
  {
    id: 1,
    name: 'Aarav Sharma',
    category: 'Singer',
    location: 'Mumbai',
    feeRange: '₹25,000 - ₹60,000',
    status: 'pending',
    submittedAt: '2025-01-18',
    languages: ['Hindi', 'English']
  },
  {
    id: 2,
    name: 'Sneha Reddy',
    category: 'DJ',
    location: 'Hyderabad',
    feeRange: '₹40,000 - ₹90,000',
    status: 'approved',
    submittedAt: '2025-01-17',
    languages: ['Telugu', 'English']
  },
  {
    id: 3,
    name: 'Raj Patel',
    category: 'Dancer',
    location: 'Ahmedabad',
    feeRange: '₹15,000 - ₹35,000',
    status: 'pending',
    submittedAt: '2025-01-16',
    languages: ['Gujarati', 'Hindi']
  },
  {
    id: 4,
    name: 'Dr. Meera Iyer',
    category: 'Speaker',
    location: 'Bangalore',
    feeRange: '₹1,00,000 - ₹2,00,000',
    status: 'approved',
    submittedAt: '2025-01-15',
    languages: ['English', 'Kannada']
  }
];

const stats = [
  {
    title: 'Total Artists',
    value: '324',
    icon: Users,
    change: '+12%'
  },
  {
    title: 'Pending Reviews',
    value: '23',
    icon: Eye,
    change: '+5%'
  },
  {
    title: 'Active Bookings',
    value: '89',
    icon: Calendar,
    change: '+18%'
  },
  {
    title: 'Revenue',
    value: '₹36,50,000',
    icon: DollarSign,
    change: '+25%'
  }
];

export default function DashboardPage() {
  const [submissions, setSubmissions] = useState(artistSubmissions);

  const handleStatusChange = (id: number, newStatus: string) => {
    setSubmissions(
      submissions.map((submission) =>
        submission.id === id ? { ...submission, status: newStatus } : submission
      )
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Manager Dashboard</h1>
        <p className="text-gray-600">Manage artist applications and bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} from last month</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Artist Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Artist Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Fee Range</TableHead>
                  <TableHead>Languages</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">{submission.name}</TableCell>
                    <TableCell>{submission.category}</TableCell>
                    <TableCell>{submission.location}</TableCell>
                    <TableCell>{submission.feeRange}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {submission.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(submission.status)}</TableCell>
                    <TableCell>{submission.submittedAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {submission.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleStatusChange(submission.id, 'approved')}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleStatusChange(submission.id, 'rejected')}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
