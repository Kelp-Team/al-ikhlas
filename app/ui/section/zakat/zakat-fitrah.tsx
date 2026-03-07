"use client";

import { useState } from "react";
import { GrainsSlash } from "@phosphor-icons/react";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemDescription,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { FITRAH_RATE_PER_PERSON } from "./constants";
import { fmt, ResultBox } from "./helpers";

export function ZakatFitrah() {
  const [persons, setPersons] = useState<number>(1);

  const total = persons * FITRAH_RATE_PER_PERSON;

  return (
    <div className="flex flex-col gap-3">
      {/* Info banner */}
      <Item variant="muted">
        <ItemMedia variant="icon">
          <GrainsSlash size={20} weight="duotone" className="text-secondary" />
        </ItemMedia>
        <ItemContent>
          <ItemDescription className="line-clamp-none text-sm leading-relaxed">
            Zakat Fitrah is obligatory for every Muslim who has food in excess
            of their own and their dependents&apos; needs on the eve of Eid
            al-Fitr. The rate for{" "}
            <strong className="text-foreground">Selangor 2025</strong> is{" "}
            <strong className="text-foreground">
              RM {fmt(FITRAH_RATE_PER_PERSON)}
            </strong>{" "}
            per person.
          </ItemDescription>
        </ItemContent>
      </Item>

      {/* Input */}
      <Field>
        <FieldLabel>Number of Persons</FieldLabel>
        <div className="flex items-center gap-3">
          <ButtonGroup>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPersons((p) => Math.max(1, p - 1))}
              aria-label="Decrease"
            >
              −
            </Button>
            <Input
              type="number"
              min={1}
              max={50}
              value={persons}
              onChange={(e) =>
                setPersons(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-20 text-center text-lg"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPersons((p) => Math.min(50, p + 1))}
              aria-label="Increase"
            >
              +
            </Button>
          </ButtonGroup>
          <span className="text-sm text-muted-foreground">
            × RM {fmt(FITRAH_RATE_PER_PERSON)} / person
          </span>
        </div>
        <FieldDescription>
          Adjust the number of people you are paying Zakat Fitrah for
        </FieldDescription>
      </Field>

      {/* Result */}
      <ResultBox
        label="Total Zakat Fitrah"
        value={`RM ${fmt(total)}`}
        highlight
        note={`For ${persons} person${persons > 1 ? "s" : ""} at RM ${fmt(FITRAH_RATE_PER_PERSON)} each`}
      />

      <p className="text-[0.7rem] text-muted-foreground leading-relaxed">
        * Rate based on Lembaga Zakat Selangor (LZS). Please verify the current
        year&apos;s rate at{" "}
        <a href="https://zakatselangor.com.my" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Zakat Selangor</a> before paying.
      </p>
    </div>
  );
}
