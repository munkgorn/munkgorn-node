require('dotenv').config()
const express = require('express');
const cors = require('cors')
const { lotto } = require("./routes/index");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(cors())
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'mg-web REST API',
            description: "rest api."
        },
    },
    apis: ["./routes/lotto.js"],
    explorer: true
}

// app.use('/catchphrases', catchphrases)
app.use('/lotto', lotto)

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', () => console.log("HI"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Up and running 🚀 on ' + port));