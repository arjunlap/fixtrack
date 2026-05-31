import {
  Wrench,
  Clock,
  CheckCircle,
  Wallet
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold mb-2">
        FixTrack 2.0
      </h1>

      <p className="text-gray-600 mb-8">
        Dashboard Operasional
      </p>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white rounded-xl p-5 shadow">
          <Wrench size={28} />
          <h2 className="mt-3 text-gray-500">
            Service Hari Ini
          </h2>
          <p className="text-3xl font-bold">
            12
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <Clock size={28} />
          <h2 className="mt-3 text-gray-500">
            Dalam Proses
          </h2>
          <p className="text-3xl font-bold">
            5
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <CheckCircle size={28} />
          <h2 className="mt-3 text-gray-500">
            Selesai
          </h2>
          <p className="text-3xl font-bold">
            4
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <Wallet size={28} />
          <h2 className="mt-3 text-gray-500">
            Omzet Hari Ini
          </h2>
          <p className="text-2xl font-bold">
            Rp 2.350.000
          </p>
        </div>

      </div>

    </div>
  );
}