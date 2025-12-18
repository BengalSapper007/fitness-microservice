import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import { getActivityDetail } from "../services/api";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const data = await getActivityDetail(id); // res.data
        // expect: { activity, recommendation, improvements, suggestions }
        const base = data.activity ?? {};
        setActivity({
          ...base,
          recommendation: data.recommendation,
          improvements: data.improvements || [],
          suggestions: data.suggestions || [],
        });
      } catch (error) {
        console.error("Error fetching activity details:", error);
      }
    };

    if (id) {
      fetchActivityDetails();
    }
  }, [id]);

  if (!activity) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 6, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Loading activity details...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        py: 4,
        px: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Button
          variant="text"
          onClick={() => navigate("/activities")}
          sx={{ textTransform: "none" }}
        >
          ⟵ Back to activities
        </Button>
      </Box>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 4,
          background:
            "linear-gradient(135deg, rgba(33,150,243,0.08), rgba(0,230,118,0.08))",
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {activity.type} Session
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: {activity.id}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <Chip
                label={`${activity.duration ?? 0} min`}
                color="primary"
                variant="filled"
              />
              <Chip
                label={`${activity.caloriesBurned ?? 0} kcal`}
                color="secondary"
                variant="outlined"
              />
            </Stack>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ mt: 1 }}
          >
            <Box flex={1}>
              <Typography variant="subtitle2" color="text.secondary">
                Type
              </Typography>
              <Typography sx={{ mb: 1 }}>{activity.type}</Typography>

              <Typography variant="subtitle2" color="text.secondary">
                Duration
              </Typography>
              <Typography sx={{ mb: 1 }}>
                {activity.duration} minutes
              </Typography>

              <Typography variant="subtitle2" color="text.secondary">
                Calories burned
              </Typography>
              <Typography sx={{ mb: 1 }}>
                {activity.caloriesBurned} kcal
              </Typography>
            </Box>

            <Box flex={1}>
              <Typography variant="subtitle2" color="text.secondary">
                Logged on
              </Typography>
              <Typography sx={{ mb: 1 }}>
                {activity.createdAt
                  ? new Date(activity.createdAt).toLocaleString()
                  : "-"}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {activity.recommendation && (
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Smart Insights
            </Typography>

            <Typography
              variant="overline"
              color="primary"
              sx={{ letterSpacing: 1 }}
            >
              Analysis
            </Typography>
            <Typography paragraph sx={{ mb: 2 }}>
              {activity.recommendation}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {activity.improvements?.length > 0 && (
              <>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ mb: 1 }}
                >
                  Improvements
                </Typography>
                <Stack spacing={1} sx={{ mb: 2 }}>
                  {activity.improvements.map((improvement, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{ pl: 1.5, borderLeft: "3px solid #e0e0e0" }}
                    >
                      {improvement}
                    </Typography>
                  ))}
                </Stack>

                <Divider sx={{ my: 2 }} />
              </>
            )}

            {activity.suggestions?.length > 0 && (
              <>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ mb: 1 }}
                >
                  Suggestions
                </Typography>
                <Stack spacing={1}>
                  {activity.suggestions.map((suggestion, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{ pl: 1.5, borderLeft: "3px solid #e0f2f1" }}
                    >
                      {suggestion}
                    </Typography>
                  ))}
                </Stack>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ActivityDetail;
