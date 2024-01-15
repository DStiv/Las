import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import 'dotenv/config';
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.use((err, req, res, next) => {
  return res.json({
    message: err.message
  });
});

app.get("/home", async (req, res, next) => {

  try {
    const result = await db.query("SELECT * FROM users ");
    res.json(result.rows)
    console.log(result.rows);
  } catch (error) {
    next(error);
  }
});

app.get("/home/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await db.query("SELECT * FROM users WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "User not found"
      });
    res.json(result.rows(0));

  } catch (error) {
    next(error);
  }

});

app.post("/home", async (req, res, next) => {
  const result = req.body;
  console.log(result);
  try {
    await db.query('INSERT INTO users (id, name, typeid, country, area, subdeparment, date) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [Number(result.Id), result.Name, result.DocType, result.Country, result.Area ,result.Deparment, result.HireDate]
    )
    console.log(result);
  } catch (error) {
    next(error);
  }
});

app.delete("/home/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await db.query("DELETE FROM users WHERE id = $1 ",
      [id]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "User not found"
      });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.put("/home/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const { lastname } = req.body
    const result = await db.query("UPDATE users SET lastname = $1 WHERE id = $2 RETURNING *",
      [lastname, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Task not found"
      });

    res.json(result.rows[0]);

  } catch (error) {
    next(error);
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
