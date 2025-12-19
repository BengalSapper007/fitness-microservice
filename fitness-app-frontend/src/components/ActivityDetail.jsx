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
    let intervalId;

    const fetchActivityDetails = async () => {
      try {
        const data = await getActivityDetail(id);
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
      intervalId = setInterval(fetchActivityDetails, 3000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
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
        maxWidth: 960,
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
          onClick={() => navigate(-1)}   // <‑ go back in history
          sx={{
            textTransform: "none",
            color: "rgba(191,219,254,0.9)",
            px: 0,
            "&:hover": { backgroundColor: "transparent", opacity: 0.8 },
          }}
        >
          ⟵ Back
        </Button>
      </Box>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow:
            "0 22px 55px rgba(15,23,42,0.7), 0 0 0 1px rgba(148,163,184,0.45)",
          backgroundColor: "rgba(93, 120, 185, 0.9)",
          color: "rgba(248,250,252,0.96)",
        }}
      >
        <CardContent sx={{ pb: 3.5 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
            sx={{ mb: 2 }}
          >
            <Box>
              <Typography variant="overline" sx={{ opacity: 0.8 }}>
                Activity summary
              </Typography>
              <Typography variant="h4" fontWeight={800} gutterBottom>
                {activity.type} session
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                ID: {activity.id}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <Chip
                label={`${activity.duration ?? 0} min`}
                sx={{
                  bgcolor: "rgba(15,23,42,0.9)",
                  color: "rgba(248,250,252,0.96)",
                  fontWeight: 600,
                }}
              />
              <Chip
                label={`${activity.caloriesBurned ?? 0} kcal`}
                variant="outlined"
                sx={{
                  borderColor: "rgba(226,232,240,0.7)",
                  color: "rgba(241,245,249,0.95)",
                  fontWeight: 500,
                  bgcolor: "rgba(15,23,42,0.35)",
                }}
              />
            </Stack>
          </Stack>

          <Divider sx={{ my: 2, borderColor: "rgba(148,163,184,0.5)" }} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ mt: 1 }}
          >
            <Box flex={1}>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.85, textTransform: "uppercase" }}
              >
                Type
              </Typography>
              <Typography sx={{ mb: 1 }}>{activity.type}</Typography>

              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.85, textTransform: "uppercase" }}
              >
                Duration
              </Typography>
              <Typography sx={{ mb: 1 }}>
                {activity.duration} minutes
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.85, textTransform: "uppercase" }}
              >
                Calories burned
              </Typography>
              <Typography sx={{ mb: 1 }}>
                {activity.caloriesBurned} kcal
              </Typography>
            </Box>

            <Box flex={1}>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.85, textTransform: "uppercase" }}
              >
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
            boxShadow:
              "0 18px 45px rgba(15,23,42,0.6), 0 0 0 1px rgba(148,163,184,0.4)",
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Smart insights
            </Typography>

            <Typography
              variant="overline"
              color="primary"
              sx={{ letterSpacing: 1, mb: 0.5, display: "block" }}
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
