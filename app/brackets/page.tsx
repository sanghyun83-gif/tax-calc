"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { SITE, TAX_CONSTANTS, getTaxBrackets, formatCurrency } from "../site-config";

export default function BracketsPage() {
    const { filingStatuses, standardDeduction } = TAX_CONSTANTS;
    const [selectedStatus, setSelectedStatus] = useState("single");
    const brackets = getTaxBrackets(selectedStatus);

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-emerald-600">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-600" />
                        <span className="text-lg font-bold text-slate-800">{SITE.year} Tax Brackets</span>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                    <h1 className="text-xl font-bold text-slate-800 mb-2">
                        {SITE.year} Federal Income Tax Brackets
                    </h1>
                    <p className="text-sm text-slate-500 mb-4">
                        Official IRS marginal tax rates by filing status
                    </p>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Select Filing Status</label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg bg-white"
                        >
                            {filingStatuses.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Standard Deduction */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-emerald-800">Standard Deduction</p>
                            <p className="text-sm text-emerald-600">
                                {filingStatuses.find(s => s.id === selectedStatus)?.name}
                            </p>
                        </div>
                        <p className="text-2xl font-bold text-emerald-700">
                            {formatCurrency(standardDeduction[selectedStatus] || standardDeduction.single)}
                        </p>
                    </div>
                </div>

                {/* Brackets Table */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
                    <div className="grid grid-cols-3 gap-2 px-4 py-3 bg-slate-100 text-xs font-semibold text-slate-600 uppercase border-b">
                        <span>Tax Rate</span>
                        <span className="col-span-2">Taxable Income Range</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {brackets.map((bracket, i) => (
                            <div key={i} className="grid grid-cols-3 gap-2 px-4 py-4 hover:bg-slate-50">
                                <span className={`font-bold ${bracket.rate <= 0.12 ? 'text-green-600' :
                                        bracket.rate <= 0.24 ? 'text-yellow-600' :
                                            bracket.rate <= 0.32 ? 'text-orange-600' :
                                                'text-red-600'
                                    }`}>
                                    {(bracket.rate * 100).toFixed(0)}%
                                </span>
                                <span className="col-span-2 text-slate-700">
                                    {formatCurrency(bracket.min)} – {bracket.max === Infinity ? 'and above' : formatCurrency(bracket.max)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How It Works */}
                <div className="bg-slate-800 text-white rounded-xl p-5 mb-6">
                    <h3 className="font-bold mb-3">How Marginal Tax Rates Work</h3>
                    <p className="text-sm text-slate-300 mb-3">
                        You don&apos;t pay your top rate on ALL your income. Each bracket only applies to income within that range.
                    </p>
                    <p className="text-sm text-slate-300">
                        <strong className="text-white">Example:</strong> If you&apos;re single with $60,000 taxable income, you pay:
                    </p>
                    <ul className="text-sm text-slate-300 mt-2 space-y-1">
                        <li>• 10% on first $11,925 = $1,193</li>
                        <li>• 12% on $11,925–$48,475 = $4,386</li>
                        <li>• 22% on $48,475–$60,000 = $2,536</li>
                        <li className="text-emerald-400 font-semibold">• Total Tax = $8,115 (13.5% effective rate)</li>
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
