import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
} from "@mui/material";
import { clothingSizeChart } from "../../constants/sizeChart";

const SizeSelectModal = ({ open, onClose, onSizeSelect, productName }) => {
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleConfirm = () => {
    if (selectedSize) {
      onSizeSelect(selectedSize);
      setSelectedSize("");
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedSize("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.3rem" }}>
        Select Size for {productName}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: "1rem" }}>
            Choose your preferred size from the chart below:
          </Typography>
          <TableContainer sx={{ marginBottom: "2rem" }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Size
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Chest (inches)
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Length (inches)
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Age Range
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clothingSizeChart.map((row) => (
                  <TableRow key={row.size}>
                    <TableCell align="center">{row.size}</TableCell>
                    <TableCell align="center">{row.chest}</TableCell>
                    <TableCell align="center">{row.length}</TableCell>
                    <TableCell align="center">{row.ageRange}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body2" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
            Select Your Size:
          </Typography>
          <RadioGroup
            value={selectedSize}
            onChange={handleSizeChange}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            {clothingSizeChart.map((row) => (
              <FormControlLabel
                key={row.size}
                value={row.size}
                control={<Radio />}
                label={row.size}
                sx={{
                  border: selectedSize === row.size ? "2px solid #ed1c24" : "1px solid #ddd",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "#ed1c24",
                  },
                }}
              />
            ))}
          </RadioGroup>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: "1rem" }}>
        <Button
          onClick={handleClose}
          sx={{
            color: "black",
            border: "1px solid #ddd",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={!selectedSize}
          variant="contained"
          sx={{
            backgroundColor: selectedSize ? "#ed1c24" : "#ccc",
            color: "white",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#c41100",
            },
          }}
        >
          Confirm Size
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SizeSelectModal;
