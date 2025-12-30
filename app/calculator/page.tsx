"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, DollarSign, Info } from "lucide-react";
import {
    SITE,
    TAX_CONSTANTS,
    calculateTax,
    formatCurrency,
    formatPercent,
    TaxResult
} from "../site-config";

export default function TaxCalculatorPage() {
    const { defaults, filingStatuses } = TAX_CONSTANTS;

    const [income, setIncome] = useState(defaults.income.toString());
    const [filingStatus, setFilingStatus] = useState(defaults.filingStatus);
    const [children, setChildren] = useState("0");
    const [result, setResult] = useState<TaxResult | null>(null);

    const handleCalculate = () => {
        const incomeNum = parseInt(income.replace(/[^0-9]/g, '')) || 0;
        const childrenNum = parseInt(children) || 0;
        setResult(calculateTax(incomeNum, filingStatus, childrenNum));
    };

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setIncome(value);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-emerald-600 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-emerald-600" />
                        <span className="text-lg font-bold text-slate-800">Income Tax Calculator</span>
                    </div>
                    <span className="ml-auto text-xs text-white bg-emerald-600 px-2 py-1 rounded-full font-bold">
                        {SITE.year}
                    </span>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                    <h1 className="text-xl font-bold text-slate-800 mb-2">
                        Calculate Your {SITE.year} Federal Income Tax
                    </h1>
                    <p className="text-sm text-slate-500 mb-6">
                        Based on official IRS tax brackets
                    </p>

                    {/* Inputs */}
                    <div className="space-y-5 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Gross Annual Income</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                <input
                                    type="text"
                                    value={parseInt(income).toLocaleString() || ''}
                                    onChange={handleIncomeChange}
                                    className="w-full pl-8 pr-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-lg"
                                    placeholder="75,000"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Filing Status</label>
                            <div className="grid grid-cols-2 gap-2">
                                {filingStatuses.map((status) => (
                                    <button
                                        key={status.id}
                                        onClick={() => setFilingStatus(status.id)}
                                        className={`p-3 rounded-lg border-2 text-left transition-colors ${filingStatus === status.id
                                                ? 'border-emerald-500 bg-emerald-50'
                                                : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                    >
                                        <span className="font-semibold text-slate-800 text-sm">{status.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Qualifying Children</label>
                            <select
                                value={children}
                                onChange={(e) => setChildren(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg bg-white"
                            >
                                {[0, 1, 2, 3, 4, 5].map(n => (
                                    <option key={n} value={n}>{n} {n === 1 ? 'child' : 'children'}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button onClick={handleCalculate}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 shadow-md">
                        <DollarSign className="w-5 h-5" />
                        Calculate Tax
                    </button>
                </div>

                {/* Results */}
                {result && (
                    <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 text-center">
                            <p className="text-sm text-emerald-100 mb-1">Estimated Federal Tax</p>
                            <p className="text-5xl font-bold">{formatCurrency(result.finalTax)}</p>
                            <p className="text-emerald-200 text-sm mt-1">
                                Effective Rate: {formatPercent(result.effectiveRate)} • Marginal: {formatPercent(result.marginalRate)}
                            </p>
                        </div>

                        <div className="p-6 space-y-3 text-sm">
                            <h4 className="font-semibold text-slate-600 uppercase text-xs tracking-wider">Breakdown</h4>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>Gross Income</span>
                                <span className="font-medium">{formatCurrency(result.grossIncome)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>Standard Deduction</span>
                                <span className="font-medium text-red-500">-{formatCurrency(result.standardDeduction)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100 bg-slate-50 px-2 -mx-2">
                                <span className="font-semibold">Taxable Income</span>
                                <span className="font-bold">{formatCurrency(result.taxableIncome)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-slate-100">
                                <span>Federal Tax (before credits)</span>
                                <span className="font-medium">{formatCurrency(result.federalTax)}</span>
                            </div>
                            {result.childTaxCredit > 0 && (
                                <div className="flex justify-between py-2 border-b border-slate-100">
                                    <span>Child Tax Credit ({parseInt(children)} × $2,000)</span>
                                    <span className="font-medium text-green-600">-{formatCurrency(result.childTaxCredit)}</span>
                                </div>
                            )}
                            <div className="flex justify-between py-3 bg-emerald-50 rounded-lg px-3">
                                <span className="font-semibold">Final Tax Owed</span>
                                <span className="font-bold text-emerald-600">{formatCurrency(result.finalTax)}</span>
                            </div>
                        </div>

                        {/* Bracket Breakdown */}
                        <div className="border-t border-slate-200 p-6">
                            <h4 className="font-semibold text-slate-600 uppercase text-xs tracking-wider mb-3">Tax by Bracket</h4>
                            <div className="space-y-2">
                                {result.bracketBreakdown.map((b, i) => (
                                    <div key={i} className="flex justify-between text-sm py-1">
                                        <span>{(b.rate * 100).toFixed(0)}% on {formatCurrency(b.taxableAmount)}</span>
                                        <span className="font-medium">{formatCurrency(Math.round(b.tax))}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-amber-50 border-t border-amber-200">
                            <div className="flex items-start gap-2">
                                <Info className="w-5 h-5 text-amber-600 mt-0.5" />
                                <p className="text-sm text-amber-800">
                                    This is an estimate. Your actual tax may vary based on additional deductions, credits, and other income.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="my-8 p-6 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
                    <p className="text-sm text-slate-400">Advertisement</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Link href="/refund" className="bg-white border border-slate-200 rounded-lg p-4 text-center hover:border-emerald-500 transition-colors">
                        <p className="text-sm font-medium text-slate-600">Estimate Refund →</p>
                    </Link>
                    <Link href="/brackets" className="bg-white border border-slate-200 rounded-lg p-4 text-center hover:border-emerald-500 transition-colors">
                        <p className="text-sm font-medium text-slate-600">View Tax Brackets →</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}
