"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type RatingInputProps = {
  value: number;
  onChange: (value: number) => void;
  size?: number;
  className?: string;
  showText?: boolean;
};

const ratingTextMap: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export function RatingInput({
  value,
  onChange,
  size = 28,
  className = "",
  showText = true,
}: RatingInputProps) {
  const [hoveredValue, setHoveredValue] = useState(0);

  const effectiveValue = hoveredValue || value;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm p-1 transition-colors hover:bg-muted"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoveredValue(star)}
            onMouseLeave={() => setHoveredValue(0)}
          >
            <Star
              size={size}
              className={`transition-colors ${
                star <= effectiveValue
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>
      {showText && effectiveValue > 0 && (
        <p className="text-sm text-muted-foreground">
          {ratingTextMap[effectiveValue]}
        </p>
      )}
    </div>
  );
}
