require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

const plaidClient = new PlaidApi(configuration);

app.get("/", (req, res) => {
    res.json({ message: "Plaid API is running!" });
  });
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/api/create-link-token", async (req, res) => {
    try {
      const response = await plaidClient.linkTokenCreate({
        user: {
          client_user_id: "unique-user-id-123", 
        },
        client_name: "Code4Change",
        products: ["transactions"],
        country_codes: ["US"],
        language: "en",
        redirect_uri: "http://localhost:3000",
      });
  
      res.json({ link_token: response.data.link_token });
    } catch (error) {
      console.error("Error creating link token:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to create link token" });
    }
  });
  

  app.post("/api/exchange-token", async (req, res) => {
    const { public_token } = req.body;
  
    try {
      const response = await plaidClient.itemPublicTokenExchange({ public_token });
      const access_token = response.data.access_token;
  
      console.log("Access Token received:", access_token);
      
      res.json({ access_token });
    } catch (error) {
      console.error("Error exchanging public token:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to exchange public token" });
    }
  });
  