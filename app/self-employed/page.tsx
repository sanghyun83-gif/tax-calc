"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase, Info } from "lucide-react";
import { SITE, TAX_CONSTANTS, calculateSelfEmploymentTax, calculateTax, formatCurrency, SelfEmploymentResult } from "../site-config";

export default function SelfEmployedPage() {
    const { selfEmployment, filingStatuses } = TAX_CONSTANTS;

    const [netIncome, setNetIncome] = useState("60000");
    const [filingStatus, setFilingStatus] = useState("single");
    const [result, setResult] = useState<SelfEmploymentResult | null>(null);
    const [totalTax, setTotalTax] = useState<number | null>(null);

    const handleCalculate = () => {
        const incomeNum = parseInt(netIncome.replace(/[^0-9]/g, '')) || 0;
        const seResult = calculateSelfEmploymentTax(incomeNum, filingStatus);
        setResult(seResult);

        // Also calculate income tax (after SE deduction)
        const adjustedIncome = incomeNum - seResult.deductibleHalf;
        const taxResult = calculateTax(adjustedIncome, filingStatus);
        setTotalTax(taxResult.finalTax + seResult.totalSETax);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-emerald-600">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-emerald-600" />
                        <span className="text-lg font-bold text-slate-800">Self-Employment Tax</span>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <h1 className="text-xl font-bold text-slate-800 mb-2">
                        Self-Employment Tax Calculator
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        For freelancers, contractors, and small business owners
                    </p>

                    {/* SE Tax Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-800">
                            <strong>SE Tax Rate:</strong> {(selfEmployment.rate * 100).toFixed(1)}%
                            (12.4% Social Security + 2.9% Medicare)
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                            SS wage cap: {formatCurrency(selfEmployment.socialSecurityWageCap)} ({SITE.year})
                        </p>
                    </div>

                    <div className="space-y-5 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Net Self-Employment Income
                            </label>
                            <p className="text-xs text-slate-500 mb-2">Revenue minus business expenses</p>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                <input
                                    type="text"
                                    value={parseInt(netIncome).toLocaleString() || ''}
                                    onChange={(e) => setNetIncome(e.target.value.replace(/[^0-9]/g, ''))}
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
                    </div>

                    <button onClick={handleCalculate}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-lg">
                        Calculate SE Tax
                    </button>
                </div>

                {/* Result */}
                {result && (
                    <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6 text-center">
                            <p className="text-sm text-orange-100 mb-1">Self-Employment Tax</p>
                            <p className="text-5xl font-bold">{formatCurrency(result.totalSETax)}</p>
                        </div>

                        <div className="p-6 space-y-3 text-sm">
                            <h4 className="font-semibold text-slate-600 uppercase text-xs tracking-wider">SE Tax Breakdown</h4>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>Net SE Income</span>
                                <span className="font-medium">{formatCurrency(result.netEarnings)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>SE Taxable (92.35%)</span>
                                <span className="font-medium">{formatCurrency(result.seTaxableEarnings)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>Social Security (12.4%)</span>
                                <span className="font-medium">{formatCurrency(result.socialSecurityTax)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>Medicare (2.9%)</span>
                                <span className="font-medium">{formatCurrency(result.medicareTax)}</span>
                            </div>
                            {result.additionalMedicare > 0 && (
                                <div className="flex justify-between py-2 border-b border-slate-100">
                                    <span>Additional Medicare (0.9%)</span>
                                    <span className="font-medium">{formatCurrency(result.additionalMedicare)}</span>
                                </div>
                            )}
                            <div className="flex justify-between py-3 bg-orange-50 rounded-lg px-3">
                                <span className="font-semibold">Total SE Tax</span>
                                <span className="font-bold text-orange-600">{formatCurrency(result.totalSETax)}</span>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 p-6">
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>Deductible Half (for income tax)</span>
                                <span className="font-medium text-green-600">-{formatCurrency(result.deductibleHalf)}</span>
                            </div>
                            {totalTax !== null && (
                                <div className="flex justify-between py-3 bg-emerald-50 rounded-lg px-3 mt-3">
                                    <span className="font-semibold">Estimated Total Tax (SE + Income)</span>
                                    <span className="font-bold text-emerald-600">{formatCurrency(totalTax)}</span>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-amber-50 border-t border-amber-200">
                            <div className="flex items-start gap-2">
                                <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                                <p className="text-sm text-amber-800">
                                    Self-employed individuals must pay quarterly estimated taxes to avoid penalties.
                                </p>
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
