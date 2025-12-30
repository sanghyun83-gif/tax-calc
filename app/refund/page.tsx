"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { SITE, TAX_CONSTANTS, calculateRefund, formatCurrency, RefundResult } from "../site-config";

export default function RefundPage() {
    const { defaults, filingStatuses } = TAX_CONSTANTS;

    const [income, setIncome] = useState(defaults.income.toString());
    const [filingStatus, setFilingStatus] = useState(defaults.filingStatus);
    const [withholding, setWithholding] = useState(defaults.withholding.toString());
    const [children, setChildren] = useState("0");
    const [result, setResult] = useState<RefundResult | null>(null);

    const handleCalculate = () => {
        const incomeNum = parseInt(income.replace(/[^0-9]/g, '')) || 0;
        const withholdingNum = parseInt(withholding.replace(/[^0-9]/g, '')) || 0;
        const childrenNum = parseInt(children) || 0;
        setResult(calculateRefund(incomeNum, filingStatus, withholdingNum, childrenNum));
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-emerald-600">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                        <span className="text-lg font-bold text-slate-800">Refund Estimator</span>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <h1 className="text-xl font-bold text-slate-800 mb-2">
                        Will You Get a Tax Refund?
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        Compare your withholding to your actual tax liability
                    </p>

                    <div className="space-y-5 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Gross Annual Income</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                <input
                                    type="text"
                                    value={parseInt(income).toLocaleString() || ''}
                                    onChange={(e) => setIncome(e.target.value.replace(/[^0-9]/g, ''))}
                                    className="w-full pl-8 pr-4 py-3 border-2 border-slate-300 rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Filing Status</label>
                            <select
                                value={filingStatus}
                                onChange={(e) => setFilingStatus(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg bg-white"
                            >
                                {filingStatuses.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Total Federal Tax Withheld (Year-to-Date)
                            </label>
                            <p className="text-xs text-slate-500 mb-2">Find this on your pay stubs or W-2 Box 2</p>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                <input
                                    type="text"
                                    value={parseInt(withholding).toLocaleString() || ''}
                                    onChange={(e) => setWithholding(e.target.value.replace(/[^0-9]/g, ''))}
                                    className="w-full pl-8 pr-4 py-3 border-2 border-slate-300 rounded-lg"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Qualifying Children</label>
                            <select
                                value={children}
                                onChange={(e) => setChildren(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg bg-white"
                            >
                                {[0, 1, 2, 3, 4, 5].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button onClick={handleCalculate}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-lg">
                        Estimate Refund
                    </button>
                </div>

                {/* Result */}
                {result && (
                    <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className={`p-6 text-center ${result.isRefund ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-gradient-to-r from-red-600 to-red-700'} text-white`}>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                {result.isRefund ? (
                                    <TrendingUp className="w-6 h-6" />
                                ) : (
                                    <TrendingDown className="w-6 h-6" />
                                )}
                                <p className="text-sm">
                                    {result.isRefund ? "Estimated Refund" : "Estimated Amount Owed"}
                                </p>
                            </div>
                            <p className="text-5xl font-bold">{formatCurrency(result.refundOrOwed)}</p>
                        </div>

                        <div className="p-6 space-y-3 text-sm">
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>Your Tax Liability</span>
                                <span className="font-medium">{formatCurrency(result.taxLiability)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>Total Withheld</span>
                                <span className="font-medium">{formatCurrency(result.totalWithholding)}</span>
                            </div>
                            <div className={`flex justify-between py-3 rounded-lg px-3 ${result.isRefund ? 'bg-green-50' : 'bg-red-50'}`}>
                                <span className="font-semibold">{result.isRefund ? 'Refund' : 'Amount Owed'}</span>
                                <span className={`font-bold ${result.isRefund ? 'text-green-600' : 'text-red-600'}`}>
                                    {formatCurrency(result.refundOrOwed)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="my-8 p-6 bg-white border border-slate-200 rounded-xl text-center">
                    <p className="text-sm text-slate-400">Advertisement</p>
                </div>
            </main>
        </div>
    );
}
