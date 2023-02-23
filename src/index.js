const { app } = require("./config/express");

const hostname = '44.213.233.39';

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
