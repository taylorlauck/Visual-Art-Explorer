// server.js most recent 
const express = require('express');
const cors = require("cors");
const bcrypt = require('bcrypt');
const pool = require("./database");
const PORT = process.env.PORT || 4000;
const jwt = require('jsonwebtoken');
const router = express.Router();

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
}));

// Middleware function for verifying JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (typeof token !== 'undefined') {
    jwt.verify(token.split(' ')[1], 'twinkletoes', (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Token is not valid' });
      }
      req.user = decoded; // Add user info to request object
      next(); // Proceed to the next middleware or route handler
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}








// Endpoint for user signup
app.post("/adduser", async (req, res) => {
  const { username, password } = req.body;

  try {
    const checkQuery = "SELECT * FROM accounts WHERE username = $1";
    const checkResult = await pool.query(checkQuery, [username]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertQuery = "INSERT INTO accounts (username, password) VALUES ($1, $2) RETURNING *";
    const insertResult = await pool.query(insertQuery, [username, hashedPassword]);

  
    console.log("New user created:", insertResult.rows[0]);

    res.status(201).json({ success: true, message: "User added successfully" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: "Failed to add user" });
  }
});


// Apply middleware globally to all routes



// Endpoint for user login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userQuery = "SELECT * FROM accounts WHERE username = $1";
    const userResult = await pool.query(userQuery, [username]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid username" });
    }

    const storedPassword = userResult.rows[0].password;
    const match = await bcrypt.compare(password, storedPassword);

    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }
    
    // Fetch user's favorites from the database
    const favoritesQuery = "SELECT * FROM favorites WHERE username = $1";
    const favoritesResult = await pool.query(favoritesQuery, [username]);
    const favorites = favoritesResult.rows;

// Extract artwork IDs from favorites
const artworkIds = favorites.map((favorite) => favorite.artworkId);

// Fetch artwork details using the retrieved artwork IDs
const artworkDetailsQuery = `
  SELECT * FROM artworks WHERE artwork_id = ANY($1)
`;
const artworkDetailsResult = await pool.query(artworkDetailsQuery, [artworkIds]);
const artworkDetails = artworkDetailsResult.rows;

    const userData = {
      username: userResult.rows[0].username,
      // Include any other data you want in the token
      //favorites, // Attach the favorites to the user data
    };

    // Generate a JWT token with user data including favorites
    const token = jwt.sign(userData, 'twinkletoes');

    // Send the token and favorites data in the response
    res.status(200).json({ success: true, message: "Login successful", token, favorites, userData, artworkDetails});
    console.log("Artwork Details:", artworkDetails);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
});






//app.use(verifyToken);

app.delete('/favorites/:artworkid', async (req, res) => {
  try {
    const { artworkid} = req.params;
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'twinkletoes');
    console.log('Decoded Token:', decodedToken);

    if (!decodedToken || !decodedToken.username) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const username = decodedToken.username;
    console.log('Request received to delete favorite');
    console.log('Username:', username);
    console.log('ArtworkId:', artworkid);

    // Perform deletion based on username and artPiece using pool.query
    const deleteQuery = 'DELETE FROM favorites WHERE username = $1 AND artworkid = $2';
    const deleteValues = [username, artworkid];

    const result = await pool.query(deleteQuery, deleteValues);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Favorite not found' });
    }

    res.status(200).json({ success: true, message: 'Favorite removed successfully' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ success: false, message: 'Error removing favorite' });
  }
});





app.use(verifyToken);



//This puts favorites ID and username into the database 
app.post('/favorite', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'twinkletoes');

    if (!decodedToken || !decodedToken.username) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const { artworkId, slug, image } = req.body;
    const username = decodedToken.username;

    const insertQuery = "INSERT INTO favorites (username, artworkId, slug, image, title) VALUES ($1, $2, $3, $4, $5)";
    await pool.query(insertQuery, [username, artworkId, slug, image, title]);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Error adding favorite' });
  }
});

// this one is going to display fav artworks 
app.get('/favorites', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'twinkletoes');

    if (!decodedToken || !decodedToken.username) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const username = decodedToken.username;

    const favoritesQuery = "SELECT * FROM favorites WHERE username = $1";
    const favoritesResult = await pool.query(favoritesQuery, [username]);
    const favorites = favoritesResult.rows;

    res.status(200).json({ success: true, favorites });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Error fetching favorites' });
  }
});


// Protected route example
app.get("/protectedEndpoint", (req, res) => {
  // This route is protected by the middleware
  res.json({ message: 'This is a protected endpoint' });
});


module.exports = app;
app.listen(PORT, () => console.log("Server running on localhost:4000"));










