import * as  bodyParser from 'body-parser';
import * as express from 'express';

import {Block, generateNextBlock, getBlockchain} from "./blockchain";

const httpPort: number = parseInt(process.env.CRYPTO_HTTP_PORT) || 3001;

const initHttpServer = () => {
    const app = express();
    app.use(bodyParser.json());

    app.get('/blocks', (req, res) => {
        console.log("GET request for /blocks")
        res.send(getBlockchain());

    });

    app.post('/mineBlock', (req, res) => {
        console.log("POST request for /mineBlock")
        const block: Block = generateNextBlock(req.body.data);
        res.send(block);
    });

    app.listen(httpPort, () => {
        console.log('Listening http on port: ' + httpPort);
    });
}

initHttpServer();