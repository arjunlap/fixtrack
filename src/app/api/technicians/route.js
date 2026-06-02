import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const technicians = await prisma.technician.findMany({
      where: { status: "Aktif" },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(technicians);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load technicians", detail: error.message },
      { status: 500 }
    );
  }
}
