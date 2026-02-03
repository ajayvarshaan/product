import { Rating } from "@mui/material";

export default function StarRating({ value, onChange, readOnly = true }: { value: number; onChange?: (v: number) => void; readOnly?: boolean; }) {
  return (
    <Rating
      value={value}
      onChange={readOnly ? undefined : (_, newValue) => onChange?.(newValue || 0)}
      precision={0.5}
      readOnly={readOnly}
      sx={{
        // Change empty star color for light background
        "& .MuiRating-iconEmpty": { color: "rgba(99, 102, 241, 0.25)" }, 
        "& .MuiRating-iconFilled": { color: "#fbbf24" }, // A warmer gold
        "& .MuiRating-iconHover": { color: "#f59e0b" }
      }}
    />
  );
}