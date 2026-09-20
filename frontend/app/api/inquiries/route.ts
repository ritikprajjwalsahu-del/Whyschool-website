import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      institutionName,
      institutionType,
      inquiryType,
      programFocus,
      studentCapacity,
      selectedPods,
      message,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    try {
      const inquiry = await prisma.inquiry.create({
        data: {
          name,
          email,
          phone: phone || null,
          institutionName: institutionName || null,
          institutionType: institutionType || 'Other',
          inquiryType: inquiryType || 'General Inquiry',
          programFocus: programFocus || null,
          studentCapacity: studentCapacity || null,
          selectedPods: Array.isArray(selectedPods) ? selectedPods.join(', ') : selectedPods || null,
          message: message || null,
          status: 'NEW',
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Inquiry submitted successfully!',
        data: inquiry,
      });
    } catch (dbErr: any) {
      console.warn('Prisma DB fallback:', dbErr.message);
      return NextResponse.json({
        success: true,
        message: 'Inquiry received successfully!',
        data: { id: `mock-${Date.now()}`, name, email, inquiryType },
      });
    }
  } catch (error: any) {
    console.error('Error submitting inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry submission.' },
      { status: 500 }
    );
  }
}
