"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./ui/combobox";
import { Label } from "./ui/label";

export function Filter({
  items,
  value,
  onValueChange,
  emptyPlaceholder,
  placeholder,
  label,
  id,
}: {
  items: Map<string, string>;
  value: string | null;
  onValueChange: (value: string | null) => void;
  emptyPlaceholder: string;
  placeholder: string;
  label: string;
  id: string;
}) {
  const entries = [...items.entries()];
  const nameToSlug = new Map(entries.map(([slug, name]) => [name, slug]));

  return (
    <div className="space-y-1">
      <Label className="ml-2" htmlFor={id}>
        {label}
      </Label>
      <Combobox
        items={entries}
        value={value ? items.get(value) : value}
        onValueChange={(name) =>
          onValueChange(name ? (nameToSlug.get(name) ?? null) : null)
        }
      >
        <ComboboxInput id={id} placeholder={placeholder} showClear />
        <ComboboxContent>
          <ComboboxEmpty>{emptyPlaceholder}</ComboboxEmpty>
          <ComboboxList>
            {([slug, name]) => (
              <ComboboxItem key={slug} value={name}>
                {name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
