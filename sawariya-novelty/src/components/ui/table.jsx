"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Table({ className, ...props }) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn(
          "w-full text-sm text-left border-collapse rounded-lg overflow-hidden shadow-sm bg-white",
          className
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }) {
  return (
    <thead
      className={cn("bg-gray-100 text-gray-700", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }) {
  return <tbody className={cn("", className)} {...props} />;
}

function TableFooter({ className, ...props }) {
  return (
    <tfoot
      className={cn("bg-gray-100 font-medium", className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }) {
  return (
    <tr
      className={cn(
        "hover:bg-gray-50 transition-colors border-b last:border-0",
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-sm font-semibold text-gray-600 whitespace-nowrap",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }) {
  return (
    <td
      className={cn(
        "px-4 py-3 text-sm text-gray-700 whitespace-nowrap",
        className
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }) {
  return (
    <caption
      className={cn("text-gray-500 mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
