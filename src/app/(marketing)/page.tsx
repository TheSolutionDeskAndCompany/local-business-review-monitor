import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <header className="flex items-center gap-3">
        <img src="/logo-bubble-check-solid.svg" alt="" className="size-10" />
        <span className="text-xl font-semibold">ReviewReady</span>
      </header>
      
      <section className="mt-16 grid gap-6 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Your reviews in one inbox.<br/>
            Reply fast. <span className="text-emerald-500">Stay ahead.</span>
          </h1>
          <p className="mt-4 text-slate-600">
            Connect Google & Facebook, get instant alerts, and post replies in one place. 
            Watch your rating and response time improve.
          </p>
          <div className="mt-8">
            <Link 
              href="/auth/signin" 
              className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-600 transition-colors"
            >
              Start free
            </Link>
            <Link 
              href="/pricing" 
              className="ml-4 text-slate-600 underline-offset-4 hover:underline"
            >
              Pricing
            </Link>
          </div>
          <div className="mt-8 text-sm text-slate-500">
            “We reply in minutes now.” — Local shop owner
          </div>
        </div>
        
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
          <img 
            src="/og-image.png" 
            alt="Dashboard preview" 
            className="w-full rounded-xl border border-slate-200"
          />
        </div>
      </section>
      
      <footer className="mt-24 text-sm text-slate-500">
        <nav className="flex gap-4">
          <a href="/privacy" className="hover:underline">Privacy</a>
          <a href="/terms" className="hover:underline">Terms</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </nav>
        <p className="mt-2">© {new Date().getFullYear()} ReviewReady</p>
      </footer>
    </main>
  );
}
