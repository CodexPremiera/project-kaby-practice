"use client";

import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import ButtonSecondary from "@/components/ui/buttons/ButtonSecondary";

export default function GiveRatingDialog({ requestId, currentRating }: { requestId: string; currentRating?: number }) {
  const [rating, setRating] = useState(currentRating || 0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/request/${requestId}/rate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      });

      if (!res.ok) throw new Error("Failed to update rating.");

      toast.success("Rating submitted!");
    } catch (err) {
      toast.error("Error submitting rating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonSecondary>Give Rating</ButtonSecondary>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Rate this request</DialogTitle>
        <div className="flex flex-col gap-4 mt-4">
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="p-2 border rounded"
          >
            <option value={0}>Select rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          <Button onClick={handleSubmit} disabled={loading || rating < 1}>
            {loading ? "Saving..." : "Submit Rating"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
