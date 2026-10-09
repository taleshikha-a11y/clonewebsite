import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import NoData from "../../../components/NoData";

const MyInvoices = () => {
  const navigate = useNavigate();
  const { invoices } = useGlobalContext();

  return (
    <div className="w-full bg-white border border-[#E0E0E0] rounded-xl h-[360px] flex flex-col overflow-hidden hover:border-[#0226BE]/20 transition-all duration-300">
      <div className="px-6 py-4 border-b border-[#E0E0E0] flex items-center justify-between bg-gray-50/50">
        <div>
          <h1 className="text-[#0226BE] text-[16px] font-[600]">Invoices & Billing</h1>
          <p className="text-[11px] text-[#666] mt-0.5">Recent account charges & statements</p>
        </div>
        <button
          className="text-[#0226BE] text-[13px] font-[500] hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1"
          onClick={() => navigate("/invoice-billing")}
        >
          See all
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto containerScroll p-4 space-y-3">
        {invoices.length === 0 ? (
          <NoData msg="No invoices yet" />
        ) : (
          invoices.map((inv) => (
            <div
              key={inv._id}
              onClick={() => navigate(`/invoice-billing/${inv.invoice_id || inv._id}`)}
              className="p-3.5 border border-[#E0E0E0] rounded-xl hover:border-[#0226BE]/30 hover:shadow-sm transition-all cursor-pointer group flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0226BE] flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#0226BE] transition-colors">
                    {inv.project_name}
                  </h4>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">{inv.invoice_id}</p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-gray-900">{inv.amount}</p>
                <span
                  className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full mt-1 ${
                    inv.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {inv.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyInvoices;
