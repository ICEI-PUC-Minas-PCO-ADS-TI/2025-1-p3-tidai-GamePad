import React from "react";

export default function NewsPagination({
  page,
  totalPages,
  onPageChange,
  maxPages = 5,
}) {
  if (totalPages <= 1) return null;
  const pages = [...Array(Math.min(totalPages, maxPages)).keys()];
  return (
    <div className="flex justify-center mt-8 gap-2">
      {pages.map((i) => (
        <button
          key={i}
          className={`px-4 cursor-pointer py-2 rounded-lg font-bold ${
            page === i + 1
              ? "bg-cyan-500 text-white"
              : "bg-zinc-700 text-cyan-300 hover:bg-cyan-700"
          }`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
