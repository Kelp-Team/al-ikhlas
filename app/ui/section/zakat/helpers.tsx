import { cn } from "@/lib/utils";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";

export function fmt(n: number) {
  return n.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function ResultBox({
  label,
  value,
  highlight,
  note,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  note?: string;
}) {
  return (
    <Item
      variant="outline"
      className={cn(
        "flex-col items-start p-4 transition-colors",
        highlight && "bg-primary border-secondary/40",
      )}
    >
      <ItemContent className="gap-1">
        <ItemTitle
          className={cn(
            "text-[0.62rem] tracking-[0.18em] uppercase font-normal",
            highlight ? "text-secondary/80" : "text-muted-foreground",
          )}
        >
          {label}
        </ItemTitle>
        <span
          className={cn(
            "text-2xl font-light font-serif",
            highlight ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {value}
        </span>
        {note && (
          <ItemDescription className="line-clamp-none text-[0.68rem] leading-relaxed mt-0.5">
            {note}
          </ItemDescription>
        )}
      </ItemContent>
    </Item>
  );
}
