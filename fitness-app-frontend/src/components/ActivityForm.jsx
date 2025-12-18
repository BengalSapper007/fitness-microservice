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
} from "@mui/material";
import { addActivity } from "../services/api";

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    avgHeartRate: "",          // always present
    additionalMetrics: {},
  });

  // metric keys per type (without HR)
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

  // map keys to human labels with units
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
          avgHeartRate: activity.avgHeartRate, // include HR inside metrics map too
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
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="activity-type-label">Activity Type</InputLabel>
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

      <TextField
        fullWidth
        label="Duration (minutes)"
        type="number"
        value={activity.duration}
        onChange={(e) =>
          setActivity({ ...activity, duration: e.target.value })
        }
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Calories Burned (kcal)"
        type="number"
        value={activity.caloriesBurned}
        onChange={(e) =>
          setActivity({ ...activity, caloriesBurned: e.target.value })
        }
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Average Heart Rate (bpm)"
        type="number"
        value={activity.avgHeartRate}
        onChange={(e) =>
          setActivity({ ...activity, avgHeartRate: e.target.value })
        }
        sx={{ mb: 2 }}
      />

      {metricFields.length > 0 && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {metricFields.map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                fullWidth
                label={labelFor(field)}
                value={activity.additionalMetrics[field] || ""}
                onChange={handleMetricChange(field)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Button type="submit" variant="contained" color="primary">
        Add Activity
      </Button>
    </Box>
  );
};

export default ActivityForm;
