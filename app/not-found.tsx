import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-[#F9FAFB]">
      <div className="w-16 h-16 rounded-full bg-[#E0F2FE] text-[#0D9488] flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[32px]">church</span>
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-[#0D9488] mb-2">
        Page Not Found
      </span>
      <h1 className="font-hanken text-4xl font-bold text-[#0F172A] mb-4">
        Peace Be With You
      </h1>
      <p className="font-inter text-base text-[#64748B] max-w-md mb-8 leading-relaxed">
        The sanctuary page or gathering detail you are looking for has been moved or is not yet published.
      </p>
      <Link
        href="/"
        className="bg-[#0D9488] hover:bg-[#0F766E] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all shadow-md active:scale-95 inline-flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}
