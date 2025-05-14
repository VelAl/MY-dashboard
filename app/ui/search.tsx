"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const PARAM_NAME = "query";
type T_Props = { placeholder: string };

export default function Search({ placeholder }: T_Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    value ? params.set(PARAM_NAME, value) : params.delete(PARAM_NAME);

    replace(`${pathname}?${params}`);
  }, 500);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor={PARAM_NAME} className="sr-only">
        Search
      </label>
      <input
        id={PARAM_NAME}
        type="search"
        className="peer block w-full rounded-md border border-sky-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={({ target }) => handleSearch(target.value)}
        defaultValue={searchParams.get(PARAM_NAME) || ""}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
