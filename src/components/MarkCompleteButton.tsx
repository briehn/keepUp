"use client";

import { useState } from "react";

export default function MarkCompleteButton({ goalId }: { goalId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleComplete = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/goals/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goalId }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      const data = await res.json();
      setError(data.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="mt-2">
      {error && <p className="text-red-500 text-sm mb-1">{error}</p>}
      <button
        onClick={handleComplete}
        disabled={loading}
        className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
      >
        {loading ? "Marking..." : "Mark as Complete"}
      </button>
    </div>
  );
}
