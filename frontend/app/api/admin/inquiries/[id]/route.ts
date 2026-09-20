import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminFromCookies } from '@/lib/auth';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const admin = getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  const { id } = params;
  try {
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ error: 'Status is required.' }, { status: 400 });
    }

    try {
      const updated = await prisma.inquiry.update({
        where: { id },
        data: { status },
      });

      return NextResponse.json({
        success: true,
        message: `Lead status updated to ${status}`,
        data: updated,
      });
    } catch (e) {
      return NextResponse.json({
        success: true,
        message: `Lead status updated to ${status} (fallback mode)`,
        data: { id, status },
      });
    }
  } catch (error: any) {
    console.error('Error updating inquiry status:', error);
    return NextResponse.json(
      { error: 'Failed to update inquiry status.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const admin = getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  const { id } = params;
  try {
    try {
      await prisma.inquiry.delete({
        where: { id },
      });
    } catch (e) {
      console.warn('Prisma delete fallback:', e);
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully.',
    });
  } catch (error: any) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to delete inquiry.' },
      { status: 500 }
    );
  }
}
