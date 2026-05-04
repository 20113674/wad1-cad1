'use strict';

import express from 'express';
import logger from './utils/logger.js';
import routes from './routes.js';
import { create } from 'express-handlebars';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true, tempFileDir: './tmp/' }));

const handlebars = create({
    extname: '.hbs',
    helpers: {
        uppercase: (str) => str.toUpperCase(),

        formatDate: (date) => {
            const d = new Date(date);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
            return d.toLocaleDateString('en-IE', options);
        },

        popularCategory: (count) => {
            return count >= 3 ? '🔥 Popular' : '';
        },

        formatPrice: (price) => {
            return price ? `€${parseFloat(price).toFixed(2)}` : 'N/A';
        },
    },
});

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.use('/', routes);

app.listen(port, () => logger.info(`Phone Tracker listening on port ${port}`));