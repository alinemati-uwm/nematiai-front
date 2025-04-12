"use client";

import { checkWindowValidity } from "@/lib/auth/auth-storage";

//* this class access to browser storage

class BrowserStorage<T> {
  constructor(
    readonly identifier: string,
    readonly storage: "localStorage" | "sessionStorage" = "sessionStorage",
  ) {}

  set(value: Partial<T> | null = null) {
    window?.[this.storage].setItem(this.identifier, JSON.stringify(value));
  }

  get(): T {
    if (checkWindowValidity()) {
      return JSON.parse(
        window?.[this.storage].getItem(this.identifier) || "{}",
      );
    }
    return JSON.parse("{}");
  }
}

export default BrowserStorage;
