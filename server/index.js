import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

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
app.get("/get_details" (req,res));

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
