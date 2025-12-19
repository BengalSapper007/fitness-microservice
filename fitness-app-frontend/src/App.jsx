import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Paper,
} from "@mui/material";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

const GlassCard = ({ children, ...props }) => (
  <Paper
    elevation={0}
    sx={{
      borderRadius: 4,
      p: 3,
      backdropFilter: "blur(18px)",
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      boxShadow:
        "0 20px 40px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(148, 163, 184, 0.25)",
      transition: "transform 0.18s ease, box-shadow 0.18s ease",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow:
          "0 24px 60px rgba(15, 23, 42, 0.55), 0 0 0 1px rgba(148, 163, 184, 0.45)",
      },
    }}
    {...props}
  >
    {children}
  </Paper>
);

const ActivitiesPage = () => (
  <Box sx={{ py: 4, display: "flex", flexDirection: "column", gap: 3 }}>
    <GlassCard>
      <ActivityForm onActivityAdded={() => window.location.reload()} />
    </GlassCard>

    <GlassCard>
      <ActivityList />
    </GlassCard>
  </Box>
);

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
          bgcolor: "radial-gradient(circle at top, #0f172a 0%, #020617 45%, #000 100%)",
          color: "rgba(241,245,249,0.96)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar
          position="sticky"
          color="transparent"
          elevation={0}
          sx={{
            backdropFilter: "blur(16px)",
            background:
              "linear-gradient(to bottom, rgba(15,23,42,0.78), rgba(15,23,42,0.35), transparent)",
            borderBottom: "1px solid rgba(148,163,184,0.35)",
          }}
        >
          <Toolbar
            sx={{
              maxWidth: 1200,
              mx: "auto",
              width: "100%",
              py: 1,
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, #22c55e 0%, #16a34a 40%, transparent 70%)",
                  boxShadow: "0 0 18px rgba(34,197,94,0.8)",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 0.6,
                  textTransform: "uppercase",
                }}
              >
                Fitness Tracker
              </Typography>
            </Box>

            {!token ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  logIn();
                }}
                sx={{
                  borderRadius: 999,
                  px: 3,
                  py: 0.75,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow:
                    "0 12px 30px rgba(59,130,246,0.55), 0 0 0 1px rgba(191,219,254,0.4)",
                }}
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
                sx={{
                  borderRadius: 999,
                  px: 3,
                  py: 0.75,
                  textTransform: "none",
                  fontWeight: 500,
                  borderColor: "rgba(148,163,184,0.7)",
                  "&:hover": {
                    borderColor: "rgba(248,250,252,0.9)",
                    backgroundColor: "rgba(15,23,42,0.6)",
                  },
                }}
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
            py: 6,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {!token ? (
                    <Container
          maxWidth="md"
          sx={{
            flex: 1,
            py: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!token ? (
            <Box
              sx={{
                width: "100%",
                maxWidth: 640,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
                gap: 4,
                alignItems: "stretch",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 4,
                  p: 4,
                  bgcolor: "rgba(15,23,42,0.9)",
                  border: "1px solid rgba(148,163,184,0.4)",
                  boxShadow:
                    "0 24px 60px rgba(15,23,42,0.7), 0 0 0 1px rgba(15,23,42,0.6)",
                }}
              >
                <Typography variant="h3" fontWeight={800} gutterBottom>
                  Sign in
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 4, opacity: 0.8, maxWidth: 360 }}
                >
                  Connect your account to start tracking workouts and unlock
                  detailed AI‑driven insights about your training.
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={logIn}
                  sx={{
                    borderRadius: 999,
                    py: 1.2,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "0.98rem",
                    boxShadow:
                      "0 16px 40px rgba(59,130,246,0.6), 0 0 0 1px rgba(191,219,254,0.4)",
                  }}
                >
                  Continue with Single Sign‑On
                </Button>

                <Typography
                  variant="caption"
                  sx={{ mt: 2.5, display: "block", opacity: 0.6 }}
                >
                  By continuing, you agree to the terms of use and privacy
                  policy.
                </Typography>
              </Paper>

              <Box
                sx={{
                  borderRadius: 4,
                  p: 3,
                  bgcolor: "rgba(15,23,42,0.7)",
                  border: "1px solid rgba(148,163,184,0.4)",
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="overline"
                    sx={{ letterSpacing: 1.4, color: "rgb(96,165,250)" }}
                  >
                    Snapshot
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ mt: 1, mb: 2 }}
                  >
                    Smarter training, less guesswork
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.8, lineHeight: 1.7 }}
                  >
                    Log every run, ride, and workout. See calories, duration,
                    and personalized recommendations generated after each
                    session.
                  </Typography>
                </Box>

                <Box
                  sx={{
                    mt: 3,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 999,
                      bgcolor: "rgba(34,197,94,0.12)",
                      fontSize: "0.75rem",
                    }}
                  >
                    Live insights
                  </Box>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 999,
                      bgcolor: "rgba(59,130,246,0.15)",
                      fontSize: "0.75rem",
                    }}
                  >
                    Activity history
                  </Box>
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 999,
                      bgcolor: "rgba(244,63,94,0.18)",
                      fontSize: "0.75rem",
                    }}
                  >
                    Goal tracking
                  </Box>
                </Box>
              </Box>
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
