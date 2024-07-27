const express = require("express");
const bodyParser = require("body-parser");
const pg = require("pg");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
const saltRounds = 10;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Water_Supply",
  password: "779076063361",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {

});
app.get("/get_details", async (req,res)=> {
    const result = await db.query("SELECT * FROM households_data");
    const data = result.rows;
    console.log(data);
});
app.post("/ascending", async (req,res)=> {
    const result = await db.query("SELECT * FROM households_data ORDER BY id ASC");
    const data = result.rows;
    console.log(data);
});
app.post("/descending", async (req,res)=> {
    const result = await db.query("SELECT * FROM households_data ORDER BY id DESC");
    const data = result.rows;
    console.log(data);
});
app.post("/filter", async (req,res)=> {
    const input = req.body.input;
    const result = await db.query(`SELECT * FROM households_data WHERE house_number LIKE '%' || $1 || '%' OR street_address LIKE '%' || $1 || '%' OR area_zone LIKE '%' || $1 || '%' OR household_id LIKE '%' || $1 || '%' OR resident_name LIKE '%' || $1 || '%' OR number_of_residents LIKE '%' || $1 || '%' OR type_of_residence LIKE '%' || $1 || '%' OR water_used_avg_per_day LIKE '%' || $1 || '%' OR water_used_last_month LIKE '%' || $1 || '%' OR payment_status LIKE '%' || $1 || '%' OR last_payment_date LIKE '%' || $1 || '%' OR meter_reading_date LIKE '%' || $1 || '%' OR previous_meter_reading LIKE '%' || $1 || '%' OR current_meter_reading LIKE '%' || $1 || '%' OR water_usage_trend LIKE '%' || $1 || '%';`,[input]);
    const data = result.rows;
    console.log(data);
});
app.post("/risk", async (req,res)=> {
    
});

app.post("/register", async (req, res) => {
    const email = req.body.username;
    // const email = "abc@gmail.com";
  const password = req.body.password;
    // const password = "779076063361";

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email_id = $1", [
      email,
    ]);
    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          await db.query(
            "INSERT INTO users (email_id, password) VALUES ($1, $2)",
            [email, hash]
          );
          res.redirect("/");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
    const email = req.body.username;
    // const email = "tanmaysawankar4441@gmail.com";

    const loginPassword = req.body.password;
    // const loginPassword = "779076063361";


  try {
    const result = await db.query("SELECT * FROM users WHERE email_id = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      //verifying the password
      bcrypt.compare(loginPassword, storedHashedPassword, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else {
          if (result) {
            console.log("   Logged In Successfully");
            res.redirect("/");
          } else {
            res.send("Incorrect Password");
          }
        }
      });
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
