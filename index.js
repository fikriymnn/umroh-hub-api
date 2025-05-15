const express = require('express');
const app = express();
const dotenv = require("dotenv");
const Routes = require('./src/routes/routes');

dotenv.config();
app.use(express.json());
app.use('/api', Routes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
