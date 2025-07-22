"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"; // Shadcn Textarea
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Label } from "@/components/ui/label"; // Shadcn Label (optional, for better UX)

export function AlignmentComponent() {
  const [businessProcess, setBusinessProcess] = useState("");
  const [informationSystem, setInformationSystem] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!businessProcess || !informationSystem) {
      setResult(0); // Default to 0 if inputs are empty
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/compute-similarity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessProcess, informationSystem }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setResult(data.similarity);
    } catch (error) {
      console.error("Error:", error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Input Form</h1>

      {/* Two textareas side by side */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
        <div className="flex-1">
          <Label htmlFor="business-process">Business Process</Label>
          <Textarea
            id="business-process"
            placeholder="Enter business process details..."
            value={businessProcess}
            onChange={(e) => setBusinessProcess(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="information-system">Information System</Label>
          <Textarea
            id="information-system"
            placeholder="Enter information system details..."
            value={informationSystem}
            onChange={(e) => setInformationSystem(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      {/* Button to compute similarity */}
      <Button onClick={handleGenerate} className="mt-6" disabled={loading}>
        {loading ? "Computing..." : "Compute Similarity"}
      </Button>

      {/* Display the result, formatted to 3 decimal places */}
      {result !== null && (
        <p className="mt-4 text-lg font-semibold">
          Similarity Score: {result.toFixed(3)}
        </p>
      )}
    </div>
  );
}
