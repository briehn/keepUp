"use client";

import { useState } from "react";

export type NewGoal = {
  id: string;
  title: string;
  description: string | null;
  frequency: string;
  createdAt: string;
  progress: { id: string; date: string }[];
};

interface Props {
  onAdd?: (goal: NewGoal) => void;
}

export default function CreateGoalForm( { onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/goals/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, frequency }),
    });

    if (res.ok) {
      const newGoal: NewGoal = await res.json();
      onAdd?.(newGoal);
      setTitle("");
      setDescription("");
      setFrequency("daily");
    } else {
      const data = await res.json();
      setError(data.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-6">
      <h2 className="text-lg font-semibold mb-2">Create a New Goal</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <select
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        className="border p-2 w-full mb-2"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? "Creating..." : "Create Goal"}
      </button>
    </form>
  );
}
