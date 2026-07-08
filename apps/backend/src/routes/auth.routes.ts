import { Router } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env";
import { HttpStatus } from "../common/constants/http";
import { ApiError } from "../common/errors/api-error";

export const authRouter = Router();

// 1. Redirect to GitHub OAuth
authRouter.get("/github", (req, res) => {
  const redirectUri = (req.query.redirect_uri as string) || "";

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message:
        "GitHub OAuth is not configured on the server. Please check environment variables."
    });
  }

  // Pass redirectUri as state so we know where to redirect back
  const state = encodeURIComponent(redirectUri);
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(env.GITHUB_CALLBACK_URL)}&scope=user:email&state=${state}`;

  res.redirect(githubAuthUrl);
});

// 2. GitHub Callback
authRouter.get("/github/callback", async (req, res, next) => {
  const code = req.query.code as string;
  const state = (req.query.state as string) || "";
  const targetRedirect =
    decodeURIComponent(state) || "http://localhost:3000/backstage";

  if (!code) {
    return next(
      new ApiError(HttpStatus.BAD_REQUEST, "Missing authorization code")
    );
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: env.GITHUB_CALLBACK_URL
        })
      }
    );

    const tokenData = (await tokenResponse.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    if (tokenData.error || !tokenData.access_token) {
      return next(
        new ApiError(
          HttpStatus.UNAUTHORIZED,
          tokenData.error_description || "Failed to exchange OAuth code"
        )
      );
    }

    // Get GitHub user profile
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "User-Agent": "portfolio-backend"
      }
    });

    const userData = (await userResponse.json()) as {
      login?: string;
      email?: string;
      error?: string;
    };

    if (!userData.login) {
      return next(
        new ApiError(
          HttpStatus.UNAUTHORIZED,
          "Failed to retrieve GitHub user profile"
        )
      );
    }

    // Verify username
    const isAllowed =
      userData.login.toLowerCase() ===
      env.ALLOWED_GITHUB_USERNAME.toLowerCase();
    if (!isAllowed) {
      const url = new URL(targetRedirect);
      url.searchParams.set("error", "unauthorized_user");
      return res.redirect(url.toString());
    }

    // Generate JWT token
    const token = jwt.sign({ username: userData.login }, env.JWT_SECRET, {
      expiresIn: "7d"
    });

    // Redirect to frontend backstage with JWT token
    const url = new URL(targetRedirect);
    url.searchParams.set("token", token);
    res.redirect(url.toString());
  } catch (error) {
    next(error);
  }
});
