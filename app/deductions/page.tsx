import Link from "next/link";
import { ArrowLeft, Receipt, CheckCircle, XCircle } from "lucide-react";
import { SITE, TAX_CONSTANTS, formatCurrency } from "../site-config";

export default function DeductionsPage() {
    const { standardDeduction, deductions } = TAX_CONSTANTS;

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-emerald-600">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Receipt className="w-5 h-5 text-emerald-600" />
                        <span className="text-lg font-bold text-slate-800">Deductions Guide</span>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
                    <h1 className="text-xl font-bold text-slate-800 mb-2">
                        {SITE.year} Tax Deductions Guide
                    </h1>
                    <p className="text-sm text-slate-500">
                        Standard deduction vs itemizing – what saves you more?
                    </p>
                </div>

                {/* Standard Deductions */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-6">
                    <h3 className="font-bold text-emerald-800 mb-3">{SITE.year} Standard Deductions</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-emerald-700">Single</span>
                            <span className="font-bold text-emerald-800">{formatCurrency(standardDeduction.single)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-emerald-700">Married Filing Jointly</span>
                            <span className="font-bold text-emerald-800">{formatCurrency(standardDeduction.marriedFilingJointly)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-emerald-700">Head of Household</span>
                            <span className="font-bold text-emerald-800">{formatCurrency(standardDeduction.headOfHousehold)}</span>
                        </div>
                    </div>
                </div>

                {/* Standard vs Itemized */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
                    <div className="p-4 bg-slate-100 border-b border-slate-200">
                        <h3 className="font-bold text-slate-800">Standard vs Itemized</h3>
                    </div>
                    <div className="p-5">
                        <p className="text-sm text-slate-600 mb-4">
                            <strong>Itemize if</strong> your total itemized deductions exceed the standard deduction. Otherwise, take the standard deduction.
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                                <strong>Tip:</strong> About 90% of taxpayers use the standard deduction.
                                Itemizing is typically only beneficial if you have a large mortgage, high state taxes, or significant charitable donations.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Common Itemized Deductions */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
                    <div className="p-4 bg-slate-100 border-b border-slate-200">
                        <h3 className="font-bold text-slate-800">Common Itemized Deductions</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="font-semibold text-slate-800">State & Local Taxes (SALT)</span>
                            </div>
                            <p className="text-sm text-slate-600 ml-6">
                                Capped at <strong>{formatCurrency(deductions.stateAndLocalTaxCap)}</strong> per year
                            </p>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="font-semibold text-slate-800">Mortgage Interest</span>
                            </div>
                            <p className="text-sm text-slate-600 ml-6">
                                On loans up to {formatCurrency(deductions.mortgageInterestLimit)}
                            </p>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="font-semibold text-slate-800">Charitable Contributions</span>
                            </div>
                            <p className="text-sm text-slate-600 ml-6">
                                Up to {deductions.charitableContributionLimit * 100}% of AGI
                            </p>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center gap-2 mb-1">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="font-semibold text-slate-800">Medical Expenses</span>
                            </div>
                            <p className="text-sm text-slate-600 ml-6">
                                Exceeding 7.5% of AGI
                            </p>
                        </div>
                    </div>
                </div>

                {/* Above-the-Line Deductions */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
                    <div className="p-4 bg-slate-100 border-b border-slate-200">
                        <h3 className="font-bold text-slate-800">Above-the-Line Deductions (Everyone Gets)</h3>
                    </div>
                    <div className="divide-y divide-slate-100 text-sm">
                        <div className="p-4 flex justify-between">
                            <span>Student Loan Interest</span>
                            <span className="font-medium">Up to {formatCurrency(deductions.studentLoanInterest)}</span>
                        </div>
                        <div className="p-4 flex justify-between">
                            <span>HSA Contribution (Individual)</span>
                            <span className="font-medium">Up to {formatCurrency(deductions.hsaContribution.individual)}</span>
                        </div>
                        <div className="p-4 flex justify-between">
                            <span>HSA Contribution (Family)</span>
                            <span className="font-medium">Up to {formatCurrency(deductions.hsaContribution.family)}</span>
                        </div>
                        <div className="p-4 flex justify-between">
                            <span>Traditional IRA</span>
                            <span className="font-medium">Up to {formatCurrency(deductions.iraContribution)}</span>
                        </div>
                        <div className="p-4 flex justify-between">
                            <span>401(k) Contribution</span>
                            <span className="font-medium">Up to {formatCurrency(deductions.contribution401k)}</span>
                        </div>
                    </div>
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
