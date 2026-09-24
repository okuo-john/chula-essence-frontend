export default function RitualBackdrop({ children, aside }) {
  return (
    <section className="ritual-page relative overflow-hidden">
      <div className="ritual-glow ritual-glow-one" aria-hidden="true" />
      <div className="ritual-glow ritual-glow-two" aria-hidden="true" />
      <div className="ritual-lines" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-start gap-10 px-4 py-10 sm:px-6 lg:py-16">
        {aside && <aside className="ritual-aside hidden w-64 shrink-0 lg:block">{aside}</aside>}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </section>
  );
}
