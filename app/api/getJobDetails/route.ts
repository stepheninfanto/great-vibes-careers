import { NextRequest, NextResponse } from 'next/server';

export default function GET(req: NextRequest, res: NextResponse) {
  const sampleData = [
    {
      jobId: 1,
      jobTitle: 'Software Engineer',
      companyName: 'TechCo Inc.',
      industryName: 'Technology',
      location: 'San Francisco, CA',
      remoteType: 'Partial Remote',
      experience: '3+ years',
      salary: '$100,000 - $120,000',
      totalEmployee: '500+',
      applyType: 'Online Application',
    },
    {
      jobId: 2,
      jobTitle: 'Marketing Specialist',
      companyName: 'Global Marketing Group',
      industryName: 'Marketing',
      location: 'New York, NY',
      remoteType: 'Fully Remote',
      experience: '2-4 years',
      salary: '$70,000 - $90,000',
      totalEmployee: '200+',
      applyType: 'Email Application',
    },
    // Add more sample job data entries as needed
  ];

  return NextResponse.json({ sampleData });
}
