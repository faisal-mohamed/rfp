import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-config";
import { prisma } from "@/lib/prisma";

// GET /api/users/stats - Get user statistics (Admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.userType !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const [
      totalUsers,
      activeUsers,
      inactiveUsers,
      roleStats,
      recentUsers
    ] = await Promise.all([
      // Total users
      prisma.user.count(),
      
      // Active users
      prisma.user.count({ where: { isActive: true } }),
      
      // Inactive users
      prisma.user.count({ where: { isActive: false } }),
      
      // Users by role
      prisma.user.groupBy({
        by: ['role'],
        _count: { role: true },
        where: { isActive: true }
      }),
      
      // Recent users (last 7 days)
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      })
    ]);

    // Format role stats
    const roleBreakdown = roleStats.reduce((acc, stat) => {
      acc[stat.role] = stat._count.role;
      return acc;
    }, {} as Record<string, number>);

    // Ensure all roles are represented
    const allRoles = ['ADMIN', 'EDITOR', 'APPROVER', 'VIEWER'];
    allRoles.forEach(role => {
      if (!roleBreakdown[role]) {
        roleBreakdown[role] = 0;
      }
    });

    return NextResponse.json({
      totalUsers,
      activeUsers,
      inactiveUsers,
      recentUsers,
      roleBreakdown
    });

  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
