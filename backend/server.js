require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
let savedAccessToken = "";

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
    savedAccessToken = response.data.access_token;

    console.log("Access Token stored:", savedAccessToken);
    res.json({ access_token: savedAccessToken });
  } catch (error) {
    console.error("Error exchanging public token:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to exchange public token" });
  }
});
  
app.get("/api/transactions", async (req, res) => {
  try {
      if (!savedAccessToken) {
          return res.status(400).json({ error: "Access token missing. Please link your bank account." });
      }

      const startDate = "2024-01-01";
      const endDate = "2024-03-01";

      console.log("Fetching transactions with access token:", savedAccessToken);

      const response = await plaidClient.transactionsGet({
          access_token: savedAccessToken,
          start_date: startDate,
          end_date: endDate,
          options: { count: 100 },
      });

      console.log("Fetched transactions from Plaid:", response.data.transactions);
      res.json({ transactions: response.data.transactions });
  } catch (error) {
      console.error("Error fetching transactions:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to fetch transactions" });
  }
});


app.post("/api/sandbox-generate-transactions", async (req, res) => {
  try {
    if (!savedAccessToken) {
      return res.status(400).json({ error: "Access token missing. Please link your bank account." });
    }

    const response = await plaidClient.sandboxTransactionsRefresh({
      access_token: savedAccessToken,
    });

    console.log("Sandbox transactions refresh triggered:", response.data);
    res.json({ message: "Fake transactions are being generated. Wait 10-15 seconds and try again." });
  } catch (error) {
    console.error("Error triggering sandbox transaction refresh:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to refresh transactions." });
  }
});

