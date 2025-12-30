"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { SITE, TAX_CONSTANTS, calculateTax, formatCurrency, formatPercent } from "../site-config";

export default function FilingStatusPage() {
    const { filingStatuses, standardDeduction } = TAX_CONSTANTS;
    const [income, setIncome] = useState("75000");

    const incomeNum = parseInt(income.replace(/[^0-9]/g, '')) || 0;

    // Calculate tax for each status
    const comparisons = filingStatuses.map(status => {
        const result = calculateTax(incomeNum, status.id);
        return {
            ...status,
            tax: result.finalTax,
            effectiveRate: result.effectiveRate,
            deduction: standardDeduction[status.id] || standardDeduction.single,
        };
    }).sort((a, b) => a.tax - b.tax);

    const lowestTax = comparisons[0]?.tax || 0;

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-emerald-600">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-emerald-600" />
                        <span className="text-lg font-bold text-slate-800">Filing Status Comparison</span>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                    <h1 className="text-xl font-bold text-slate-800 mb-2">
                        How Filing Status Affects Your Tax
                    </h1>
                    <p className="text-sm text-slate-500 mb-4">
                        Compare tax liability across different filing statuses
                    </p>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Enter Your Income</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                            <input
                                type="text"
                                value={parseInt(income).toLocaleString() || ''}
                                onChange={(e) => setIncome(e.target.value.replace(/[^0-9]/g, ''))}
                                className="w-full pl-8 pr-4 py-3 border-2 border-slate-300 rounded-lg text-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Comparison Cards */}
                <div className="space-y-4 mb-6">
                    {comparisons.map((status, i) => (
                        <div
                            key={status.id}
                            className={`bg-white rounded-xl border-2 p-5 ${i === 0 ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-slate-200'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-bold text-slate-800">{status.name}</h3>
                                    <p className="text-sm text-slate-500">{status.description}</p>
                                </div>
                                {i === 0 && (
                                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold">
                                        Lowest Tax
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <p className="text-xs text-slate-500">Deduction</p>
                                    <p className="font-bold text-slate-800">{formatCurrency(status.deduction)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Tax</p>
                                    <p className="font-bold text-emerald-600">{formatCurrency(status.tax)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Effective Rate</p>
                                    <p className="font-bold text-slate-800">{formatPercent(status.effectiveRate)}</p>
                                </div>
                            </div>

                            {i > 0 && (
                                <div className="mt-3 pt-3 border-t border-slate-100">
                                    <p className="text-sm text-red-600 text-center">
                                        +{formatCurrency(status.tax - lowestTax)} more than {comparisons[0].name}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Eligibility */}
                <div className="bg-slate-800 text-white rounded-xl p-5 mb-6">
                    <h3 className="font-bold mb-3">Filing Status Eligibility</h3>
                    <ul className="text-sm text-slate-300 space-y-2">
                        <li><strong className="text-white">Single:</strong> Unmarried, divorced, or legally separated</li>
                        <li><strong className="text-white">Married Filing Jointly:</strong> Married couples filing one return</li>
                        <li><strong className="text-white">Married Filing Separately:</strong> Married but filing individual returns</li>
                        <li><strong className="text-white">Head of Household:</strong> Unmarried, pay 50%+ of home costs, have qualifying dependent</li>
                    </ul>
                </div>

                <div className="my-8 p-6 bg-white border border-slate-200 rounded-xl text-center">
                    <p className="text-sm text-slate-400">Advertisement</p>
                </div>

                <div className="text-center">
                    <Link href="/calculator" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold">
                        Calculate Your Tax →
                    </Link>
                </div>
            </main>
        </div>
    );
}
