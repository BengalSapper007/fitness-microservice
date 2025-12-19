// ActivityList.jsx
import React from "react";
import Grid from "@mui/material/Grid";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getActivities } from "../services/api";

const ActivityList = () => {
  const [activities, setActivities] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getActivities();
        setActivities(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setActivities([]);
      }
    };
    fetchActivities();
  }, []);

  if (!activities.length) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography color="text.secondary">
          No activities yet. Log your first session to see it here.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {activities.map((activity) => (
        <Grid key={activity.id} item xs={12} sm={6} md={4}>
          <Card
            onClick={() => navigate(`/activities/${activity.id}`)}
            sx={{
              cursor: "pointer",
              height: "100%",
              borderRadius: 3,
              backgroundColor: "rgba(93, 120, 185, 0.9)",
              color: "rgba(248,250,252,0.96)",
              boxShadow:
                "0 16px 40px rgba(15,23,42,0.6), 0 0 0 1px rgba(30,64,175,0.5)",
              transition: "transform 0.18s ease, box-shadow 0.18s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow:
                  "0 22px 55px rgba(15,23,42,0.85), 0 0 0 1px rgba(191,219,254,0.7)",
              },
            }}
          >
            <CardContent sx={{ pb: 2.5 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={1.5}
              >
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: 0.7,
                      color: "rgba(226,232,240,0.85)",
                    }}
                  >
                    {activity.type}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 0.5, fontWeight: 700 }}>
                    {activity.name || "Session"}
                  </Typography>
                </Box>

                <Stack spacing={0.5} alignItems="flex-end">
                  <Chip
                    size="small"
                    label={`${activity.duration ?? 0} min`}
                    color="default"
                    sx={{
                      bgcolor: "rgba(15,23,42,0.9)",
                      color: "rgba(248,250,252,0.95)",
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    size="small"
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

              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ mb: 0.5, color: "rgba(226,232,240,0.85)" }}
                >
                  Duration
                </Typography>
                <Typography variant="body2">
                  {activity.duration ?? 0} minutes
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mt: 1, mb: 0.5, color: "rgba(226,232,240,0.85)" }}
                >
                  Calories burned
                </Typography>
                <Typography variant="body2">
                  {activity.caloriesBurned ?? 0} kcal
                </Typography>
              </Box>

              {activity.createdAt && (
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 2,
                    color: "rgba(226,232,240,0.8)",
                  }}
                >
                  Logged on{" "}
                  {new Date(activity.createdAt).toLocaleDateString()}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActivityList;
