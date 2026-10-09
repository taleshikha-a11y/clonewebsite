import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext';
import PageWrapper from '../../components/PageWrapper';
import TotalSurveyIcon from '../../assets/icons/TotalSurveyIcon.svg';
import TotalLiveSurveyIcon from '../../assets/icons/TotalLiveSurvey.svg';
import TotalCompleatSurvey from '../../assets/icons/TotalCompleateSurvey.svg';
import InvoiceMiratsIcon from '../../assets/icons/InvoiceMiratsIcon.svg';
import NoData from '../../components/NoData';
import { FiDownload, FiEye, FiCheckCircle, FiClock, FiFileText, FiCreditCard } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';

const Invoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { invoices, setInvoices, showToast, user } = useGlobalContext();
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    if (id) {
      const found = invoices.find((i) => i.invoice_id === id || i._id === id);
      if (found) {
        setSelectedInvoice(found);
      }
    }
  }, [id, invoices]);

  const totalInvoicesCount = invoices.length;
  const paidInvoicesCount = invoices.filter((i) => i.status === 'Paid').length;
  const unpaidInvoicesCount = invoices.filter((i) => i.status === 'Pending').length;

  const filteredInvoices = invoices.filter((i) => {
    if (statusFilter === 'All') return true;
    return i.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const handleDownloadInvoice = (inv) => {
    showToast(`Downloading official tax receipt for ${inv.invoice_id}...`, 'info');
  };

  const handlePayInvoice = (invId) => {
    setInvoices((prev) =>
      prev.map((i) => (i._id === invId ? { ...i, status: 'Paid' } : i))
    );
    if (selectedInvoice && selectedInvoice._id === invId) {
      setSelectedInvoice((prev) => ({ ...prev, status: 'Paid' }));
    }
    showToast('Payment processed successfully via Visa ending in 4242!', 'success');
  };

  const handleCloseModal = () => {
    setSelectedInvoice(null);
    if (id) navigate('/invoice-billing', { replace: true });
  };

  return (
    <PageWrapper>
      <div className="w-full flex flex-col gap-6 py-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-4">
          <div>
            <h1 className="text-[#0226BE] text-2xl font-bold tracking-tight">
              Invoices & Billing
            </h1>
            <p className="text-gray-600 text-xs mt-1">
              View study statements, transaction history, and download billing receipts
            </p>
          </div>
          <button
            onClick={() => {
              const pending = invoices.filter((i) => i.status === 'Pending');
              if (pending.length > 0) {
                setInvoices((prev) => prev.map((i) => ({ ...i, status: 'Paid' })));
                showToast('All outstanding invoices marked settled!', 'success');
              } else {
                showToast('All pending balances are settled or scheduled', 'info');
              }
            }}
            className="px-5 py-2.5 bg-[#0226BE] hover:bg-[#011c91] text-white text-xs font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap"
          >
            Pay All Due Invoices
          </button>
        </div>

        {/* 3 Summary Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:border-gray-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center p-2.5 flex-shrink-0">
              <img src={TotalSurveyIcon} alt="Total" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{totalInvoicesCount}</h3>
              <p className="text-xs font-medium text-gray-500 mt-0.5">Total Invoices</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:border-gray-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center p-2.5 flex-shrink-0">
              <img src={TotalLiveSurveyIcon} alt="Paid" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{paidInvoicesCount}</h3>
              <p className="text-xs font-medium text-gray-500 mt-0.5">Paid Invoices</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:border-gray-300 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center p-2.5 flex-shrink-0">
              <img src={TotalCompleatSurvey} alt="Unpaid" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{unpaidInvoicesCount}</h3>
              <p className="text-xs font-medium text-gray-500 mt-0.5">Unpaid / Due Invoices</p>
            </div>
          </div>
        </div>

        {/* Invoices Table Container */}
        <div className="bg-white border border-[#E0E0E0] rounded-xl overflow-hidden shadow-sm">
          {/* Filter Bar */}
          <div className="p-4 sm:p-5 border-b border-[#E0E0E0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
            <div className="flex items-center gap-2">
              {['All', 'Paid', 'Pending'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    statusFilter === tab
                      ? 'bg-[#0226BE] text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400">
              Invoiced to: <span className="font-semibold text-gray-700">{user?.organizationName}</span>
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto containerScroll">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-[#E0E0E0]">
                <tr>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Invoice ID
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Study / Project
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0E0E0]">
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <NoData msg="No invoices matching status" />
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => (
                    <tr
                      key={inv._id}
                      onClick={() => setSelectedInvoice(inv)}
                      className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                    >
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className="text-xs font-mono font-bold text-[#0226BE]">
                          {inv.invoice_id}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 max-w-[260px]">
                        <p className="text-xs font-semibold text-gray-900 truncate group-hover:text-[#0226BE] transition-colors">
                          {inv.project_name}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{inv.payment_method}</p>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-xs text-gray-600">
                        {inv.issue_date}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-xs text-gray-600">
                        {inv.due_date}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap text-xs font-bold text-gray-900">
                        {inv.amount}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                            inv.status === 'Paid'
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {inv.status === 'Paid' ? (
                            <FiCheckCircle size={12} className="text-green-600" />
                          ) : (
                            <FiClock size={12} className="text-amber-600" />
                          )}
                          {inv.status}
                        </span>
                      </td>
                      <td
                        className="px-5 py-3.5 whitespace-nowrap text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="p-1.5 text-gray-400 hover:text-[#0226BE] hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Invoice"
                          >
                            <FiEye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadInvoice(inv)}
                            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download PDF"
                          >
                            <FiDownload className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/60">
              <div className="flex items-center gap-2.5">
                <img src={InvoiceMiratsIcon} alt="Mirats" className="w-7 h-7 object-contain" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">
                    Invoice {selectedInvoice.invoice_id}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-mono">Mirats Quanto DIY Platform</p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
              >
                <RxCross2 className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                <div>
                  <p className="text-[11px] text-gray-400 uppercase font-semibold">Billed To</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{user?.organizationName}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      selectedInvoice.status === 'Paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {selectedInvoice.status}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">Due: {selectedInvoice.due_date}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">Itemized Breakdown</p>
                <div className="bg-gray-50 rounded-xl p-3.5 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-800">
                    <span>{selectedInvoice.project_name}</span>
                    <span className="font-semibold">{selectedInvoice.amount}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-[11px]">
                    <span>Platform Service & Fraud Verification</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-[11px]">
                    <span>Payment Method</span>
                    <span>{selectedInvoice.payment_method}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-sm text-gray-900">
                    <span>Total Amount</span>
                    <span className="text-[#0226BE]">{selectedInvoice.amount}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3">
                {selectedInvoice.status !== 'Paid' ? (
                  <button
                    onClick={() => handlePayInvoice(selectedInvoice._id)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <FiCreditCard className="w-3.5 h-3.5" />
                    Pay Now
                  </button>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                    <FiCheckCircle size={14} /> Paid & Verified
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleDownloadInvoice(selectedInvoice);
                    }}
                    className="px-4 py-2 bg-[#0226BE] text-white text-xs font-semibold rounded-lg hover:bg-[#011c91] flex items-center gap-1.5 shadow-sm"
                  >
                    <FiDownload className="w-3.5 h-3.5" />
                    PDF Receipt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
};

export default Invoice;
