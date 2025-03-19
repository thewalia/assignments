const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000)

app.use((req, res, next) => {
  const userId = req.headers['user-id'];

  if (!userId) {
    return res.status(404).json({ error: 'User ID is required in headers' });
  }

  // Check if the userId already exists in the global object
  if (numberOfRequestsForUser[userId]) {
    // If user exists, increment the count
    numberOfRequestsForUser[userId].count++;
  } else {
    // If user doesn't exist, create a new entry with count as 1
    numberOfRequestsForUser[userId] = { count: 1 };
  }

  if (numberOfRequestsForUser[userId].count >= 5)
    res.status(404).send()

  next()
})

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

module.exports = app;