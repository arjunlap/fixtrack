import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const WORKFLOW_STATUSES = [
  "ANTRI",
  "DIAGNOSA",
  "MENUNGGU PART",
  "PROSES",
  "QC",
  "SELESAI",
  "DIAMBIL",
  "BATAL",
  "REFUND",
];

function normalizePhone(countryCode, phone) {
  const cleanCode = String(countryCode || "+62").replace(/[^\d+]/g, "");
  const cleanPhone = String(phone || "").replace(/[^\d]/g, "").replace(/^0/, "");
  return `${cleanCode}${cleanPhone}`;
}

function parseMoney(value) {
  return Number(String(value || "0").replace(/[^0-9.]/g, "")) || 0;
}

function mapService(service) {
  return {
    ...service,
    customerName: service.customer?.name || service.customerName,
    customerPhone: service.customer?.phone || service.customerPhone,
    address: service.customer?.address || service.address || "",
    timeline: service.statusLogs || [],
  };
}

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: {
        customer: true,
        statusLogs: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(services.map(mapService));
  } catch (error) {
    console.error("GET SERVICES ERROR:", error);

    return NextResponse.json(
      {
        error: "Gagal mengambil data service",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.customerPhone || !body.brand || !body.device || !body.issue) {
      return NextResponse.json(
        {
          error: "Data wajib belum lengkap",
          detail: "Nama, WhatsApp, brand, device, dan kerusakan wajib diisi.",
        },
        { status: 400 }
      );
    }

    const phone = normalizePhone(body.countryCode, body.customerPhone);

    const customer = await prisma.customer.upsert({
      where: {
        phone,
      },
      update: {
        name: String(body.customerName),
        address: String(body.address || ""),
      },
      create: {
        name: String(body.customerName),
        phone,
        address: String(body.address || ""),
      },
    });

    const total = await prisma.service.count();

    const service = await prisma.service.create({
      data: {
        invoice: `INV${String(total + 1).padStart(3, "0")}`,
        status: "ANTRI",

        customerId: customer.id,
        customerName: String(body.customerName),
        customerPhone: phone,
        address: String(body.address || ""),

        countryCode: String(body.countryCode || "+62"),
        currency: String(body.currency || "IDR"),

        brand: String(body.brand),
        device: String(body.device),
        imei: String(body.imei || ""),
        color: String(body.color || ""),

        issue: String(body.issue),
        diagnosis: String(body.diagnosis || ""),

        cost: parseMoney(body.cost),

        technician: String(body.technician || ""),
        lockPattern: String(body.lockPattern || ""),

        trackingCode: `TRK${Date.now()}`,

        statusLogs: {
          create: {
            status: "ANTRI",
            note: "Service masuk",
          },
        },
      },
      include: {
        customer: true,
        statusLogs: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return NextResponse.json(mapService(service));
  } catch (error) {
    console.error("CREATE SERVICE ERROR:", error);

    return NextResponse.json(
      {
        error: "Gagal menyimpan service",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const id = Number(body.id);
    const status = String(body.status || "").toUpperCase();

    if (!id || !status) {
      return NextResponse.json(
        {
          error: "Data status tidak valid",
          detail: "ID service dan status wajib dikirim.",
        },
        { status: 400 }
      );
    }

    if (!WORKFLOW_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          error: "Status tidak dikenal",
          detail: `Status harus salah satu dari: ${WORKFLOW_STATUSES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const service = await prisma.service.update({
      where: {
        id,
      },
      data: {
        status,
        statusLogs: {
          create: {
            status,
            note: body.note ? String(body.note) : `Status berubah ke ${status}`,
          },
        },
      },
      include: {
        customer: true,
        statusLogs: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return NextResponse.json(mapService(service));
  } catch (error) {
    console.error("UPDATE SERVICE ERROR:", error);

    return NextResponse.json(
      {
        error: "Gagal update status",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        {
          error: "ID tidak valid",
        },
        { status: 400 }
      );
    }

    await prisma.service.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE SERVICE ERROR:", error);

    return NextResponse.json(
      {
        error: "Gagal menghapus service",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
