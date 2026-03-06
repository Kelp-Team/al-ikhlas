const stats = [
  { value: "2,000", label: "Jemaah Capacity" },
  { value: "5", label: "Daily Prayers" },
  { value: "12+", label: "Monthly Events" },
  { value: "Est. 2003", label: "Serving the Community" },
];

export function StatsBar() {
  return (
    <div className="bg-muted border-b border-border flex flex-wrap px-4 md:px-12">
      {stats.map((stat, i) => (
        <div key={i} className="pr-8 md:pr-12 mr-8 md:mr-12 py-5 md:py-7 border-r border-border last:border-r-0">
          <div className="font-serif text-xl md:text-2xl text-primary leading-none">{stat.value}</div>
          <div className="text-muted-foreground text-[0.68rem] tracking-[0.15em] uppercase mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
