import express from "express"
import { bootstrap } from "./bootstrap";
const app = express()
const port = 5000

app.use(express.json());
app.get('/', (_, res) => {
  res.status(200).send("hello world")
})
bootstrap(app).setup();
app.listen(port, () => console.log(`Running on port ${port}`))
