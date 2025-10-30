const jwt = require("jsonwebtoken");

//! authMiddleware.js - Middleware to protect routes using JWT

// Usage: auth([roles])
// roles: optional array of allowed user roles (e.g., ["admin"])

// Steps:
// 1. Check if the Authorization header exists.
// 2. Verify the format is "Bearer <token>".
// 3. Decode and verify the JWT using the secret key.
// 4. If roles are provided, check if the user's role is allowed.
// 5. If all checks pass, attach decoded user info to req.user and call next().
// 6. If any check fails, respond with 401 Unauthorized or 403 Forbidden.

const auth =
  (roles = []) =>
  (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if (!header)
        return res.status(401).json({ message: "Ingen token fundet" });

      const parts = header.split(" ");
      if (parts.length !== 2 || parts[0] !== "Bearer")
        return res.status(401).json({ message: "Ugyldig token format" });

      const token = parts[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Ingen adgang" });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Ugyldig token " });
    }
  };

module.exports = auth;
