import { prisma } from "@/lib/prisma";

export default async function Page({ params }) {
  const service = await prisma.service.findFirst({
    where: {
      trackingCode: params.trackingCode,
    },
  });

  if (!service) {
    return (
      <div className="p-10">
        Invoice tidak ditemukan
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen p-8">
      <div className="max-w-[190mm] mx-auto border p-6">

        <div className="flex justify-between border-b pb-4 mb-4">
          <div>
            <h1 className="text-3xl font-black">
              FIXTRACK
            </h1>

            <p>Nota Service HP</p>
          </div>

          <div className="text-right">
            <h2 className="font-black text-2xl">
              {service.invoice}
            </h2>

            <p>{service.status}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <h3 className="font-bold">
              Customer
            </h3>

            <p>{service.customerName}</p>
            <p>{service.customerPhone}</p>
          </div>

          <div>
            <h3 className="font-bold">
              Device
            </h3>

            <p>{service.brand}</p>
            <p>{service.device}</p>
            <p>{service.imei}</p>
          </div>

        </div>

        <div className="mt-6">
          <h3 className="font-bold">
            Kerusakan
          </h3>

          <p>{service.issue}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-bold">
            Diagnosa
          </h3>

          <p>{service.diagnosis}</p>
        </div>

        <div className="mt-8 border-t pt-4 flex justify-between">
          <span>Total</span>

          <span className="font-black">
            {service.currency} {service.cost}
          </span>
        </div>

      </div>
    </main>
  );
}