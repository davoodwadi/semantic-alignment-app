"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function AlignmentComponent() {
  const [businessProcess, setBusinessProcess] = useState("");
  const [informationSystem, setInformationSystem] = useState("");
  const [result, setResult] = useState(null);

  const handleGenerate = () => {
    // "Take" the content from each textarea (e.g., log them or process them)
    console.log("Business Process Input:", businessProcess);
    console.log("Information System Input:", informationSystem);

    // Generate a random number (e.g., between 0 and 1)
    const randomNumber = Math.random();
    setResult(randomNumber);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Semantic Alignment App</h1>

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

      {/* Button to generate random number */}
      <Button onClick={handleGenerate} className="mt-6">
        Generate Random Number
      </Button>

      {/* Display the result */}
      {result !== null && (
        <p className="mt-4 text-lg font-semibold">Alignment Score {result}</p>
      )}
    </div>
  );
}
