import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

const ActivitiesPage = () => {
  return (
    <Box sx={{ py: 3 }}>
      <Box
        sx={{
          mb: 3,
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <ActivityForm onActivityAdded={() => window.location.reload()} />
      </Box>

      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <ActivityList />
      </Box>
    </Box>
  );
};

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } =
    useContext(AuthContext);

  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar position="static" elevation={0} color="transparent">
          <Toolbar
            sx={{
              maxWidth: 1200,
              mx: "auto",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Fitness Tracker
            </Typography>

            {!token ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  logIn();
                }}
                sx={{ borderRadius: 999 }}
              >
                Login
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  logOut();
                }}
                sx={{ borderRadius: 999 }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <Container
          maxWidth="md"
          sx={{
            flex: 1,
            py: 4,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {!token ? (
            <Box
              sx={{
                textAlign: "center",
                mt: 8,
                p: 4,
                borderRadius: 3,
                boxShadow: 3,
                bgcolor: "background.paper",
              }}
            >
              <Typography variant="h4" gutterBottom fontWeight={700}>
                Welcome to Fitness Tracker
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
                Track your activities, monitor calories, and get personalized
                recommendations.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  logIn();
                }}
                sx={{ borderRadius: 999, px: 4 }}
              >
                Login to Get Started
              </Button>
            </Box>
          ) : (
            <Box sx={{ width: "100%" }}>
              <Routes>
                <Route path="/activities" element={<ActivitiesPage />} />
                <Route path="/activities/:id" element={<ActivityDetail />} />
                <Route
                  path="/"
                  element={
                    token ? (
                      <Navigate to="/activities" replace />
                    ) : (
                      <div>Welcome !! Please Login</div>
                    )
                  }
                />
              </Routes>
            </Box>
          )}
        </Container>
      </Box>
    </Router>
  );
}

export default App;
