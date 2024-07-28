const express = require("express");
const bodyParser = require("body-parser");
const pg = require("pg");
const bcrypt = require("bcrypt");
const axios = require("axios");
const path = require('path');
const fs = require('fs');
const cors = require('cors');




const app = express();
const port = 3001;
const saltRounds = 10;

const db = new pg.Client({
  user: "postgres",
  host: "35.200.163.250",
  database: "Water_Supply",
  password: "root",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());


app.get("/", (req, res) => {

});
app.get("/get_details", async (req, res) => {
  const result = await db.query("SELECT * FROM households_data");
  const data = result.rows;
  console.log(data);
});
app.post("/ascending", async (req, res) => {
  const result = await db.query("SELECT * FROM households_data ORDER BY id ASC");
  const data = result.rows;
  console.log(data);
});
app.post("/descending", async (req, res) => {
  const result = await db.query("SELECT * FROM households_data ORDER BY id DESC");
  const data = result.rows;
  console.log(data);
});
app.post("/filter", async (req, res) => {
  const input = req.body.input;
  const result = await db.query(`SELECT * FROM households_data WHERE house_number LIKE '%' || $1 || '%' OR street_address LIKE '%' || $1 || '%' OR area_zone LIKE '%' || $1 || '%' OR household_id LIKE '%' || $1 || '%' OR resident_name LIKE '%' || $1 || '%' OR number_of_residents LIKE '%' || $1 || '%' OR type_of_residence LIKE '%' || $1 || '%' OR water_used_avg_per_day LIKE '%' || $1 || '%' OR water_used_last_month LIKE '%' || $1 || '%' OR payment_status LIKE '%' || $1 || '%' OR last_payment_date LIKE '%' || $1 || '%' OR meter_reading_date LIKE '%' || $1 || '%' OR previous_meter_reading LIKE '%' || $1 || '%' OR current_meter_reading LIKE '%' || $1 || '%' OR water_usage_trend LIKE '%' || $1 || '%';`, [input]);
  const data = result.rows;
  console.log(data);
});

app.get("/reports", async (req, res) => {
  const result = await db.query("SELECT * FROM reports");
  res.send(result.rows);

});

app.post("/reports", async (req, res) => {
  const result = await db.query("SELECT * FROM reports");
  console.log(result.rows);

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

app.get('/plot', async (req, res) => {
  try {
    const query = `
        SELECT area_zone, water_used_last_month
        FROM households_data
        ORDER BY water_used_last_month DESC
        LIMIT 5
    `;
    // const result=await db.query(query);

    const tosend = [
      {
          "area_zone": "Zone 2",
          "consumption_per_month": {
              "January": 1344,
              "February": 1354,
              "March": 1184,
              "April": 1202,
              "May": 596,
              "June": 752,
              "July": 913,
              "August": 1154,
              "September": 1375,
              "October": 538,
              "November": 1384,
              "December": 743
          },
          "consumption_avg_month": 1044.9166666666667
      },
      {
          "area_zone": "Zone 1",
          "consumption_per_month": {
              "January": 658,
              "February": 1240,
              "March": 554,
              "April": 1478,
              "May": 1390,
              "June": 597,
              "July": 1256,
              "August": 1306,
              "September": 1373,
              "October": 1380,
              "November": 718,
              "December": 722
          },
          "consumption_avg_month": 1056.0
      },
      {
          "area_zone": "Zone 5",
          "consumption_per_month": {
              "January": 867,
              "February": 1253,
              "March": 502,
              "April": 1465,
              "May": 1228,
              "June": 894,
              "July": 1150,
              "August": 848,
              "September": 834,
              "October": 888,
              "November": 1318,
              "December": 1146
          },
          "consumption_avg_month": 1032.75
      },
    ]

    const response = await axios.post('http://127.0.0.1:5050/plot', tosend, {
      responseType: 'arraybuffer'
    });

    // Save the response to a file in the public/uploads directory
    const filename = 'water_consumption_plot.png';
    const filePath = path.join(__dirname, 'public', 'uploads', filename);
    fs.writeFileSync(filePath, response.data);

    // Send the file URL as the response
    res.json({ fileUrl: `/uploads/${filename}` });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/plot', async (req, res) => {
  try {
    const query = `
        SELECT area_zone, 
        FROM households_data
        ORDER BY water_used_last_month DESC
        LIMIT 5
    `;
    // const result=await db.query(query);

    const tosend = [
      {
          "area_zone": "Zone 2",
          "consumption_per_month": {
              "January": 1344,
              "February": 1354,
              "March": 1184,
              "April": 1202,
              "May": 596,
              "June": 752,
              "July": 913,
              "August": 1154,
              "September": 1375,
              "October": 538,
              "November": 1384,
              "December": 743
          },
          "consumption_avg_month": 1044.9166666666667
      },
      {
          "area_zone": "Zone 1",
          "consumption_per_month": {
              "January": 658,
              "February": 1240,
              "March": 554,
              "April": 1478,
              "May": 1390,
              "June": 597,
              "July": 1256,
              "August": 1306,
              "September": 1373,
              "October": 1380,
              "November": 718,
              "December": 722
          },
          "consumption_avg_month": 1056.0
      },
      {
          "area_zone": "Zone 5",
          "consumption_per_month": {
              "January": 867,
              "February": 1253,
              "March": 502,
              "April": 1465,
              "May": 1228,
              "June": 894,
              "July": 1150,
              "August": 848,
              "September": 834,
              "October": 888,
              "November": 1318,
              "December": 1146
          },
          "consumption_avg_month": 1032.75
      },
    ]

    const response = await axios.post('http://127.0.0.1:5050/plot', tosend, {
      responseType: 'arraybuffer'
    });

    // Save the response to a file in the public/uploads directory
    const filename = 'water_consumption_plot.png';
    const filePath = path.join(__dirname, 'public', 'uploads', filename);
    fs.writeFileSync(filePath, response.data);

    // Send the file URL as the response
    res.json({ fileUrl: `/uploads/${filename}` });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Result {
//     command: 'SELECT',
//     rowCount: 5,
//     oid: null,
//     rows: [
//       { area_zone: 'Zone 2', water_used_last_month: '9652' },
//       { area_zone: 'Zone 4', water_used_last_month: '9516' },
//       { area_zone: 'Zone 2', water_used_last_month: '9484' },
//       { area_zone: 'Zone 2', water_used_last_month: '9081' },
//       { area_zone: 'Zone 1', water_used_last_month: '9009' }
//     ],
//     fields: [
//       Field {
//         name: 'area_zone',
//         tableID: 16775,
//         columnID: 4,
//         dataTypeID: 25,
//         dataTypeSize: -1,
//         dataTypeModifier: -1,
//         format: 'text'
//       },
//       Field {
//         name: 'water_used_last_month',
//         tableID: 16775,
//         columnID: 10,
//         dataTypeID: 25,
//         dataTypeSize: -1,
//         dataTypeModifier: -1,
//         format: 'text'
//       }
//     ],
//     _parsers: [ [Function: noParse], [Function: noParse] ],
//     _types: TypeOverrides {
//       _types: {
//         getTypeParser: [Function: getTypeParser],
//         setTypeParser: [Function: setTypeParser],
//         arrayParser: [Object],
//         builtins: [Object]
//       },
//       text: {},
//       binary: {}
//     },
//     RowCtor: null,
//     rowAsArray: false,
//     _prebuiltEmptyResultObject: { area_zone: null, water_used_last_month: null }



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
