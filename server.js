const app = require("./app");
require('dotenv');
const connectDatabase = require("./config/database");
const PORT = 4000;



// Connecting to database
connectDatabase();

app.listen(PORT, () => {
    console.log(`Server  is working on http://localhost:${PORT}`);
});
