const express = require("express");
const axios = require("axios");
const User = require("../models/User.js");
const router = express.Router();
require('dotenv').config();
const token = process.env.GITHUB_TOKEN;
let user = new User();

router.post("/addUser", async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(200).json({ message: "User already in the database." });
    }

    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userData = response.data;
    console.log(userData);
    if (userData.login !== null) {
      user = new User({
        username: userData.login,
        id: userData.id,
        node_id: userData.node_id,
        avatar_url: userData.avatar_url,
        gravatar_id: userData.gravatar_id,
        url: userData.url,
        html_url: userData.html_url,
        followers_url: userData.followers_url,
        following_url: userData.following_url,
        gists_url: userData.gists_url,
        starred_url: userData.starred_url,
        subscriptions_url: userData.subscriptions_url,
        organizations_url: userData.organizations_url,
        repos_url: userData.repos_url,
        events_url: userData.events_url,
        received_events_url: userData.received_events_url,
        type: userData.type,
        site_admin: userData.site_admin,
        name: userData.name,
        company: userData.company,
        blog: userData.blog,
        location: userData.location,
        email: userData.email,
        hireable: userData.hireable,
        bio: userData.bio,
        twitter_username: userData.twitter_username,
        public_repos: userData.public_repos,
        public_gists: userData.public_gists,
        followers: userData.followers,
        following: userData.following,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
      });
    }
    await user.save();
    res.status(201).json({ message: "User saved successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { isDeleted: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/update/:username", async (req, res) => {
  const { username } = req.params;
  const updates = req.body;

  try {
    const user = await User.findOneAndUpdate({ username }, updates, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User updated successfully.", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/search", async (req, res) => {
  const { username, location } = req.query;

  try {
    const query = { isDeleted: false };
    if (username) query.username = { $regex: username, $options: "i" };
    if (location) query.location = { $regex: location, $options: "i" };

    const users = await User.find(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/all-users", async (req, res) => {
  const { sortBy } = req.query;

  try {
    const users = await User.find().sort({ [sortBy]: 1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
