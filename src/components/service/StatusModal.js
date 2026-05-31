"use client";

import { X } from "lucide-react";
import { statusList } from "@/data/initialData";

export default function StatusModal({ currentStatus, onClose, onUpdate }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center border-b p-5">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Update Status</h3>
            <p className="text-gray-600">Status saat ini: {currentStatus}</p>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
            <X size={22} />
          </button>
        </div>

        <div className="p-5 grid grid-cols-2 gap-3">
          {statusList.map((status) => (
            <button
              key={status}
              onClick={() => onUpdate(status)}
              className={`px-4 py-3 rounded-xl font-semibold ${
                currentStatus === status
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
