import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.post('/api/monitoring', (req: express.Request, res: express.Response): void => {
    const {roomId, temperature, moisture} = req.body;
    const data = `monitoring,room=${roomId} temperature=${temperature},moisture=${moisture}`;
    const binary = Buffer.from(data);

    axios({
        url: 'http://localhost:8086/write?db=ServerRoom&u=admin&p=admin',
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream'
        },
        data: binary
    })
    .then(r => {
        res.send(r)
    })
    .catch(e => {
        res.send(e)
    });
});

const port = parseInt(process.env.SERVER_PORT) || 8080;
app.listen(port);