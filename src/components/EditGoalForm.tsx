import { useState } from "react";
import { Visibility } from "@/services/goal";

export type GoalProgress = { id: string; date: string };
export type GoalType = {
  id: string;
  title: string;
  description: string | null;
  frequency: string;
  visibility: Visibility;
  createdAt: string;
  progress: GoalProgress[];
};

interface Props {
  goal: GoalType;
  onCancel: () => void;
  onSave: (updated: GoalType) => void;
}

export default function EditGoalForm({ goal, onCancel, onSave }: Props) {
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description ?? "");
  const [frequency, setFrequency] = useState(goal.frequency);
  const [visibility, setVisibility] = useState<Visibility>(goal.visibility);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/goals/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goalId: goal.id,
          title,
          description,
          frequency,
          visibility,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const updated: GoalType = await res.json();
      onSave(updated);
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md space-y-2">
      <input
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        className="w-full p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <select
        className="w-full p-2 border rounded"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <select
        className="w-full p-2 border rounded"
        value={visibility}
        onChange={(e) => setVisibility(e.target.value as Visibility)}
      >
        <option value={Visibility.PUBLIC}>Public</option>
        <option value={Visibility.PRIVATE}>Private</option>
      </select>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 bg-gray-200 rounded"
          disabled={isSaving}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded"
          disabled={isSaving}
        >
          {isSaving ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
