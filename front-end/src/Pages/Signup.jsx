import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Movie Stats | Sign Up";
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) return setError("Email and password are required");
    if (password.length < 6) return setError("Password must be at least 6 characters");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Signup failed");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "background.default", p: 3 }}>
      <Paper sx={{ width: 420, p: 4 }} elevation={3}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Create account</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={submit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            helperText="At least 6 characters"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </Button>
        </form>
        <Button variant="text" sx={{ mt: 2 }} onClick={() => navigate("/login")}>
          Already have an account?
        </Button>
      </Paper>
    </Box>
  );
}

export default Signup;
