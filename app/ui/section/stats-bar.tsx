const stats = [
  { value: "2,000", label: "Jemaah Capacity" },
  { value: "5", label: "Daily Prayers" },
  { value: "12+", label: "Monthly Events" },
  { value: "Est. 2003", label: "Serving the Community" },
];

export function StatsBar() {
  return (
    <div className="bg-warm border-b border-parchment flex px-12">
      {stats.map((stat, i) => (
        <div key={i} className="pr-12 mr-12 py-7 border-r border-parchment last:border-r-0">
          <div className="font-serif text-2xl text-forest leading-none">{stat.value}</div>
          <div className="text-[var(--text-3)] text-[0.68rem] tracking-[0.15em] uppercase mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
