import Link from "next/link";
import { SITE, CALCULATORS, TAX_CONSTANTS, formatCurrency } from "./site-config";
import { ArrowRight, CheckCircle, DollarSign, TrendingUp } from "lucide-react";

export default function HomePage() {
  const featuredCalculators = CALCULATORS.filter(c => c.featured);
  const otherCalculators = CALCULATORS.filter(c => !c.featured);
  const { brackets, standardDeduction } = TAX_CONSTANTS;
  const singleBrackets = brackets.single;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-600" />
            <span className="text-lg font-bold text-slate-800">{SITE.name}</span>
          </div>
          <span className="text-sm text-white bg-emerald-600 px-3 py-1.5 rounded-full font-bold">
            {SITE.year} IRS
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-800 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/50 rounded-full px-4 py-2 mb-6">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span className="text-sm text-emerald-200">{SITE.year} IRS Official Rates</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {SITE.year} Federal
            <span className="block text-emerald-300">Tax Calculator</span>
          </h1>

          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Calculate your income tax, estimate your refund, and understand your tax bracket.
            Free and based on official IRS rates.
          </p>

          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-emerald-700 px-6 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
          >
            <DollarSign className="w-5 h-5" />
            Calculate My Tax
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-sm text-slate-600 mb-1">Standard Deduction</p>
              <p className="text-2xl font-bold text-emerald-700">{formatCurrency(standardDeduction.single)}</p>
              <p className="text-xs text-emerald-600">Single</p>
            </div>
            <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-sm text-slate-600 mb-1">Standard Deduction</p>
              <p className="text-2xl font-bold text-emerald-700">{formatCurrency(standardDeduction.marriedFilingJointly)}</p>
              <p className="text-xs text-emerald-600">Married Filing Jointly</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm text-slate-600 mb-1">Top Tax Rate</p>
              <p className="text-2xl font-bold text-blue-700">37%</p>
              <p className="text-xs text-blue-600">Over $626,350 (Single)</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-sm text-slate-600 mb-1">Child Tax Credit</p>
              <p className="text-2xl font-bold text-amber-700">{formatCurrency(TAX_CONSTANTS.credits.childTaxCredit)}</p>
              <p className="text-xs text-amber-600">Per qualifying child</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Calculators */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Free {SITE.year} Tax Tools
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {featuredCalculators.map((calc) => {
            const IconComponent = calc.icon;
            return (
              <Link
                key={calc.id}
                href={`/${calc.id}`}
                className="group bg-white border border-slate-200 rounded-xl p-5 hover:border-emerald-500 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col">
                  <div className="p-3 bg-emerald-100 rounded-lg w-fit group-hover:bg-emerald-600 transition-colors mb-3">
                    <IconComponent className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-600 mb-1">
                    {calc.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3">
                    {calc.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-emerald-600 text-sm font-semibold mt-auto">
                    Open <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {otherCalculators.length > 0 && (
          <div className="grid md:grid-cols-2 gap-3">
            {otherCalculators.map((calc) => {
              const IconComponent = calc.icon;
              return (
                <Link
                  key={calc.id}
                  href={`/${calc.id}`}
                  className="group bg-white border border-slate-200 rounded-lg p-4 hover:border-emerald-500 transition-all flex items-center gap-3"
                >
                  <IconComponent className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
                  <span className="text-sm text-slate-600 group-hover:text-emerald-600 font-medium">
                    {calc.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Tax Bracket Preview */}
      <section className="bg-slate-100 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            {SITE.year} Federal Tax Brackets (Single)
          </h2>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-2 px-4 py-3 bg-slate-100 text-xs font-semibold text-slate-600 uppercase border-b">
              <span>Rate</span>
              <span className="col-span-2">Taxable Income</span>
            </div>
            <div className="divide-y divide-slate-100">
              {singleBrackets.map((bracket, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 px-4 py-3 hover:bg-slate-50">
                  <span className="font-bold text-emerald-600">{(bracket.rate * 100).toFixed(0)}%</span>
                  <span className="col-span-2 text-slate-700">
                    {formatCurrency(bracket.min)} – {bracket.max === Infinity ? 'and above' : formatCurrency(bracket.max)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-6">
            <Link href="/brackets" className="text-emerald-600 font-semibold hover:underline">
              View All Filing Statuses →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-3">
            File Smarter This Tax Season
          </h2>
          <p className="text-emerald-100 mb-6">
            Know your tax liability before you file. Get your estimate in 2 minutes.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-emerald-700 px-6 py-4 rounded-xl font-bold transition-colors"
          >
            <DollarSign className="w-5 h-5" />
            Calculate Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold">{SITE.name}</span>
            </div>
            <p className="text-sm text-slate-400 text-center">
              For informational purposes only. Not tax advice.
            </p>
            <p className="text-sm text-slate-500">
              © {SITE.year} {SITE.name}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
