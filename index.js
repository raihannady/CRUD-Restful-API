const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3001;
const user = require("./server/api/user");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Api berjalan pada port ${PORT}`);
});

app.use("/users", user);
