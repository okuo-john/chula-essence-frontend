import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="min-h-screen overflow-hidden bg-soft-pink px-6 py-8 text-chula-black sm:px-10 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-between">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold tracking-wide text-chula-black transition-colors hover:text-primary-pink"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary-pink shadow-sm">
            <Sparkles size={18} strokeWidth={2.2} />
          </span>
          Chula Essence
        </Link>

        <section className="grid items-center gap-12 py-16 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-primary-pink">
              Page not found
            </p>
            <h1 className="font-heading text-[clamp(5.5rem,18vw,13rem)] font-semibold leading-[0.78] tracking-tight text-chula-black">
              404
            </h1>
            <h2 className="mt-8 max-w-xl font-heading text-4xl leading-tight sm:text-5xl">
              This look has gone off the page.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-chula-black/65">
              The page you are looking for does not exist or may have moved. Let us
              take you back to something beautiful.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary-pink px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-pink/25 transition-all hover:-translate-y-0.5 hover:bg-chula-black focus:outline-none focus:ring-2 focus:ring-primary-pink focus:ring-offset-2 focus:ring-offset-soft-pink"
            >
              <Home size={18} />
              Back to home
              <ArrowLeft className="rotate-180" size={17} />
            </Link>
          </div>

          <div className="relative mx-auto flex aspect-square w-full max-w-100 items-center justify-center rounded-[40%_60%_55%_45%/45%_40%_60%_55%] bg-primary-pink p-8 shadow-2xl shadow-primary-pink/20 sm:p-12">
            <div className="flex aspect-square w-full items-center justify-center rounded-full border border-white/70 bg-white/15 text-center backdrop-blur-sm">
              <div>
                <p className="font-heading text-7xl font-semibold leading-none text-white sm:text-8xl">
                  Oh!
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/85">
                  Lost in the details
                </p>
              </div>
            </div>
            <span className="absolute -right-3 top-8 h-5 w-5 rounded-full bg-gold sm:-right-5 sm:top-12" />
            <span className="absolute -bottom-2 left-8 h-3 w-3 rounded-full bg-chula-black sm:left-12" />
          </div>
        </section>

        <p className="text-xs font-medium uppercase tracking-[0.2em] text-chula-black/45">
          Beauty, care, and confidence
        </p>
      </div>
    </main>
  );
}

export default NotFound;