// ActivityList.jsx
import React from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { getActivities } from "../services/api";
import { Card, CardContent, Typography } from "@mui/material";

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

  return (
    <Grid container spacing={2}>
      {activities.map((activity) => (
        <Grid key={activity.id} item xs={12} sm={6} md={4}>
          <Card
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/activities/${activity.id}`)}
          >
            <CardContent>
              <Typography variant="h6">{activity.name}</Typography>
              <Typography variant="body2">Type: {activity.type}</Typography>
              <Typography variant="body2">
                Duration: {activity.duration} minutes
              </Typography>
              <Typography variant="body2">
                Calories Burned: {activity.caloriesBurned}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActivityList;
