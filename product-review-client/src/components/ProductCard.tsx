import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Button, IconButton, Box, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Product } from "../types/Product";
import StarRating from "./StarRating";

export default function ProductCard({ product, onDelete }: { product: Product; onDelete: (id: string) => void; }) {
  return (
    <Card
      className="glass-panel"
      sx={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        position: "relative"
      }}
    >
      <Box
        sx={{
          height: "180px",
          background: `linear-gradient(120deg, ${stringToColor(product.name)} 0%, #f1f5f9 100%)`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography
          sx={{
            fontSize: "4rem",
            filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.1))",
            transform: "rotate(-5deg)"
          }}
        >
          📦
        </Typography>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60px",
            background: "linear-gradient(to top, rgba(255,255,255,0.8), transparent)"
          }}
        />
      </Box>

      <CardContent sx={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
          <Typography
            variant="h6"
            sx={{ margin: 0, fontSize: "1.15rem", fontWeight: "700", color: "#1e293b", lineHeight: "1.4" }}
          >
            {product.name}
          </Typography>
          <Chip
            label={`₹${product.price}`}
            sx={{
              background: "#ecfdf5",
              color: "#059669",
              fontSize: "0.85rem",
              fontWeight: "700"
            }}
          />
        </Box>

        <Box sx={{ marginBottom: "1rem" }}>
          <StarRating value={Number(product.rating) || 0} readOnly={true} />
        </Box>

        <Typography
          sx={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.6", flex: 1, marginBottom: "1.5rem" }}
        >
          {(String(product.description ?? "")).length > 70 ? (String(product.description ?? "")).substring(0, 70) + "..." : product.description}
        </Typography>

        <Box sx={{ display: "flex", gap: "0.75rem", marginTop: "auto" }}>
          <Button
            component={Link}
            to={`/product/${product._id}`}
            variant="outlined"
            sx={{
              flex: 1,
              background: "#f8fafc",
              borderColor: "#e2e8f0",
              fontSize: "0.9rem",
              textDecoration: "none",
              color: "#334155"
            }}
          >
            Details
          </Button>
          <IconButton
            onClick={() => onDelete(product._id)}
            sx={{
              background: "rgba(239, 68, 68, 0.1)",
              color: "#ef4444"
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

function stringToColor(str: string) {
  const hues = [210, 260, 320, 160, 30, 45];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return `hsl(${hues[Math.abs(hash) % hues.length]}, 80%, 90%)`;
}