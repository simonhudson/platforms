"use client";

import type React from "react";

import { useState } from "react";
import { useActionState } from "react";
import { Smile } from "lucide-react";
import { createSubdomainAction } from "@/app/actions";
import { rootDomain } from "@/lib/utils";

type CreateState = {
  error?: string;
  success?: boolean;
  subdomain?: string;
  icon?: string;
};

function SubdomainInput({ defaultValue }: { defaultValue?: string }) {
  return (
    <div className="space-y-2">
      <label htmlFor="subdomain">Subdomain</label>
      <div className="flex items-center">
        <div className="relative flex-1">
          <input
            id="subdomain"
            name="subdomain"
            placeholder="your-subdomain"
            defaultValue={defaultValue}
            className="w-full rounded-r-none focus:z-10"
            required
          />
        </div>
        <span className="bg-gray-100 px-3 border border-l-0 border-input rounded-r-md text-gray-500 min-h-[36px] flex items-center">
          .{rootDomain}
        </span>
      </div>
    </div>
  );
}

export const SubdomainForm = () => {
  const [state, action, isPending] = useActionState<CreateState, FormData>(
    createSubdomainAction,
    {}
  );

  return (
    <form action={action} className="space-y-4">
      <SubdomainInput defaultValue={state?.subdomain} />

      {state?.error && (
        <div className="text-sm text-red-500">{state.error}</div>
      )}

      <button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating..." : "Create Subdomain"}
      </button>
    </form>
  );
};
