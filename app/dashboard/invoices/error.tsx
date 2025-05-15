"use client";

import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import Link from "next/link";

type T_Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: T_Props) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <section>
        <div className="text-red-600 font-bold mt-4">
          {error.name}: {error.message}
        </div>
      </section>
      <div className="mt-4 flex gap-2">
        <button
          className="flex items-center gap-2 whitespace-nowrap rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
          onClick={() => reset()}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </button>

        <Link
          href="/dashboard"
          className="flex items-center gap-2 whitespace-nowrap rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        >
          <HomeIcon className="h-4 w-4" />
          Home
        </Link>
      </div>
    </main>
  );
}
