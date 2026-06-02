import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load services", detail: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.customerPhone || !body.brand || !body.device || !body.issue) {
      return NextResponse.json(
        { error: "Data wajib belum lengkap" },
        { status: 400 }
      );
    }

    const total = await prisma.service.count();

    const service = await prisma.service.create({
      data: {
        invoice: `INV${String(total + 1).padStart(3, "0")}`,
        status: "ANTRI",
        customerName: String(body.customerName),
        customerPhone: String(body.customerPhone),
        brand: String(body.brand),
        device: String(body.device),
        imei: body.imei ? String(body.imei) : "",
        color: body.color ? String(body.color) : "",
        issue: String(body.issue),
        diagnosis: body.diagnosis ? String(body.diagnosis) : "",
        cost: Number(body.cost || 0),
        technician: body.technician ? String(body.technician) : "",
        lockPattern: body.lockPattern ? String(body.lockPattern) : "",
        trackingCode: `TRK${Date.now()}`,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("CREATE SERVICE ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create service",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    const service = await prisma.service.update({
      where: { id: Number(body.id) },
      data: { status: body.status },
    });

    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update service", detail: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete service", detail: error.message },
      { status: 500 }
    );
  }
}