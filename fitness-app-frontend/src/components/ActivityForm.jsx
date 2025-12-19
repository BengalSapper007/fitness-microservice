import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { addActivity } from "../services/api";

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    avgHeartRate: "",
    additionalMetrics: {},
  });

  const metricFields = useMemo(() => {
    switch (activity.type) {
      case "RUNNING":
        return ["pace", "distance"];
      case "CYCLING":
        return ["cadence", "elevation"];
      case "SWIMMING":
        return ["strokes", "laps"];
      case "WEIGHT_TRAINING":
        return ["reps", "sets"];
      case "HIIT":
        return ["intensity", "recovery"];
      case "YOGA":
      case "STRETCHING":
        return ["flexibility", "balance"];
      case "WALKING":
        return ["steps", "speed"];
      case "CARDIO":
        return ["resistance", "endurance"];
      default:
        return ["intensityLevel"];
    }
  }, [activity.type]);

  const labelFor = (key) => {
    switch (key) {
      case "pace":
        return "Pace (min/km)";
      case "distance":
        return "Distance (km)";
      case "cadence":
        return "Cadence (rpm / spm)";
      case "elevation":
        return "Elevation gain (m)";
      case "strokes":
        return "Strokes (count)";
      case "laps":
        return "Laps (count)";
      case "reps":
        return "Reps (count)";
      case "sets":
        return "Sets (count)";
      case "intensity":
        return "Intensity (1–10)";
      case "recovery":
        return "Recovery (seconds)";
      case "flexibility":
        return "Flexibility (1–10)";
      case "balance":
        return "Balance (1–10)";
      case "steps":
        return "Steps (count)";
      case "speed":
        return "Speed (km/h)";
      case "resistance":
        return "Resistance (level)";
      case "endurance":
        return "Endurance (minutes)";
      case "intensityLevel":
        return "Intensity level (1–10)";
      default:
        return key;
    }
  };

  const handleMetricChange = (key) => (e) => {
    const value = e.target.value;
    setActivity((prev) => ({
      ...prev,
      additionalMetrics: {
        ...prev.additionalMetrics,
        [key]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...activity,
        additionalMetrics: {
          ...activity.additionalMetrics,
          avgHeartRate: activity.avgHeartRate,
        },
      };
      await addActivity(payload);
      onActivityAdded();
      setActivity({
        type: "RUNNING",
        duration: "",
        caloriesBurned: "",
        avgHeartRate: "",
        additionalMetrics: {},
      });
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        p: 3,
        bgcolor: "rgba(105, 133, 198, 0.9)",
        border: "1px solid rgba(148,163,184,0.35)",
        color: "rgba(248,250,252,0.95)",
      }}
    >
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
        Log a new activity
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, opacity: 0.75 }}>
        Capture core details and optional performance metrics for more accurate
        insights.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2.2 }}
      >
        <FormControl fullWidth>
          <InputLabel id="activity-type-label" sx={{ color: "rgba(226,232,240,0.8)" }}>
            Activity Type
          </InputLabel>
          <Select
            labelId="activity-type-label"
            label="Activity Type"
            value={activity.type}
            onChange={(e) =>
              setActivity({
                ...activity,
                type: e.target.value,
                additionalMetrics: {},
              })
            }
            sx={{
              borderRadius: 2,
            }}
          >
            <MenuItem value="RUNNING">Running</MenuItem>
            <MenuItem value="CYCLING">Cycling</MenuItem>
            <MenuItem value="SWIMMING">Swimming</MenuItem>
            <MenuItem value="WEIGHT_TRAINING">Weight Training</MenuItem>
            <MenuItem value="HIIT">HIIT</MenuItem>
            <MenuItem value="YOGA">Yoga</MenuItem>
            <MenuItem value="STRETCHING">Stretching</MenuItem>
            <MenuItem value="WALKING">Walking</MenuItem>
            <MenuItem value="CARDIO">Cardio</MenuItem>
          </Select>
        </FormControl>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Duration (min)"
              type="number"
              value={activity.duration}
              onChange={(e) =>
                setActivity({ ...activity, duration: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Calories (kcal)"
              type="number"
              value={activity.caloriesBurned}
              onChange={(e) =>
                setActivity({ ...activity, caloriesBurned: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Avg HR (bpm)"
              type="number"
              value={activity.avgHeartRate}
              onChange={(e) =>
                setActivity({ ...activity, avgHeartRate: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        {metricFields.length > 0 && (
          <>
            <Typography
              variant="subtitle2"
              sx={{ mt: 1, opacity: 0.8, textTransform: "uppercase" }}
            >
              Additional metrics
            </Typography>
            <Grid container spacing={2}>
              {metricFields.map((field) => (
                <Grid item xs={12} sm={6} key={field}>
                  <TextField
                    fullWidth
                    label={labelFor(field)}
                    value={activity.additionalMetrics[field] || ""}
                    onChange={handleMetricChange(field)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 999,
              px: 4,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Add Activity
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ActivityForm;
