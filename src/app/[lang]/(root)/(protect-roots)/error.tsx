"use client";

// Error boundaries must be Client Components
import { useEffect } from "react";

import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/plate-ui/button";
import { useGetDictionary } from "@/hooks";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const {
    page: {
      error: {
        something_went_wrong,
        refresh,
        apologize_inconvenience,
        clear_cache_cookies,
        ensure_stable_internet_connection,
        issue_persists,
        unexpected_error,
      },
      chat: { retry_button_label },
    },
  } = useGetDictionary();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <AppLayout>
      <AppLayout.side></AppLayout.side>
      <AppLayout.body>
        <AppLayout.header upgrade profile></AppLayout.header>
        <AppLayout.main>
          <div className="flex  items-center justify-center">
            <div className="flex flex-col w-[95%] max-w-[700px] text-center gap-y-4">
              <h2 className="font-semibold text-lg mb-6">
                {something_went_wrong}
              </h2>
              <div className="flex flex-col p-8 bg-muted-dark rounded-lg text-left gap-y-1">
                <div className="mb-3">{unexpected_error}</div>
                <div className="flex flex-col italic gap-y-1">
                  <div>- {refresh}</div>
                  <div>- {clear_cache_cookies}</div>
                  <div>- {ensure_stable_internet_connection}</div>
                </div>
              </div>
              <div>{issue_persists}</div>
              <div>{apologize_inconvenience}</div>
              <div className="flex justify-center">
                <Button
                  onClick={() => reset()}
                  className="text-white"
                  size="lg"
                >
                  {retry_button_label}
                </Button>
              </div>
            </div>
          </div>
        </AppLayout.main>
      </AppLayout.body>
    </AppLayout>
  );
}
