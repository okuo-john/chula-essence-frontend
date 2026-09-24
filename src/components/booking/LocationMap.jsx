export default function LocationMap() {
  return (
    <>
      <div className="h-36 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
        <div className="mt-4 flex-1 min-h-[200px] rounded-xl overflow-hidden">
          <iframe
            title="Chula Essence Location"
            src="https://www.google.com/maps?q=Country+Home+Road+Benin+City+Edo+State&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <a
        href="https://www.google.com/maps/search/?api=1&query=Country+Home+Road+Benin+City+Edo+State"
        target="_blank"
        rel="noreferrer"
        className="mt-4 block text-center rounded-full border border-primary-pink px-4 py-2 font-body text-sm font-semibold text-primary-pink transition hover:bg-primary-pink hover:text-white"
      >
        View on Map
      </a>
    </>
  );
}