const { app } = require("./config/express");

const hostname = '44.213.233.39';

const main = () => {
    try {
        app.listen(app.get('port'), hostname);
        console.log(`Server is running in http://${hostname}:${app.get('port')}/`);
    } catch (error) {
        console.log(error);
    }
}

main();
