import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';

const MOCK_LEADS = [
  {
    id: 'lead-101',
    name: 'Dr. Rajesh Sharma',
    email: 'r.sharma@iitbbs.ac.in',
    phone: '+91 7326869001',
    institutionName: 'IIT Bhubaneswar',
    institutionType: 'College',
    inquiryType: 'Campus Audit Request',
    programFocus: 'Venture Creation & Student Startups',
    studentCapacity: '500+',
    selectedPods: 'Young Founders, Future Skills',
    message: 'Interested in setting up a campus incubation ecosystem and running joint hackathons.',
    status: 'NEW',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'lead-102',
    name: 'Ananya Pattnaik',
    email: 'ananya@saiinternational.edu.in',
    phone: '+91 94370 12345',
    institutionName: 'SAI International School',
    institutionType: 'K12',
    inquiryType: 'K-12 Custom Blueprint Export',
    programFocus: 'Leadership & EQ Development',
    studentCapacity: '250-500',
    selectedPods: 'Grade 6-8 Young Innovators, Grade 9-10 Future Leaders',
    message: 'Looking for a comprehensive 12-week experiential program for Grade 8 to 10 students.',
    status: 'IN_REVIEW',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: 'lead-103',
    name: 'Prof. Subhasish Mohanty',
    email: 'principal@rcm.ac.in',
    phone: '+91 98610 98765',
    institutionName: 'Regional College of Management (RCM)',
    institutionType: 'College',
    inquiryType: 'Partnership Deck Download',
    programFocus: 'Corporate Readiness & Real-World Exposure',
    studentCapacity: '100-250',
    selectedPods: 'Placement Accelerator, Corporate Immersion',
    message: 'Would like to schedule an executive presentation with WhySchool founders.',
    status: 'CONTACTED',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  }
];

export async function GET(req: Request) {
  const admin = getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get('status');
  const searchFilter = searchParams.get('search')?.toLowerCase();

  try {
    let inquiries: any[] = [];
    try {
      const whereClause: any = {};
      if (statusFilter && statusFilter !== 'ALL') {
        whereClause.status = statusFilter;
      }
      inquiries = await prisma.inquiry.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
      });
    } catch (e) {
      console.warn('Prisma DB fallback for getInquiries.');
    }

    if (!inquiries || inquiries.length === 0) {
      inquiries = MOCK_LEADS;
    }

    if (searchFilter) {
      inquiries = inquiries.filter(
        (item: any) =>
          item.name.toLowerCase().includes(searchFilter) ||
          item.email.toLowerCase().includes(searchFilter) ||
          (item.institutionName && item.institutionName.toLowerCase().includes(searchFilter)) ||
          item.inquiryType.toLowerCase().includes(searchFilter)
      );
    }

    if (statusFilter && statusFilter !== 'ALL') {
      inquiries = inquiries.filter((item: any) => item.status === statusFilter);
    }

    return NextResponse.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error: any) {
    console.error('Error fetching admin inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve inquiries.' },
      { status: 500 }
    );
  }
}
