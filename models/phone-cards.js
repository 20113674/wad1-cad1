'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const phoneCards = {

    store: new JsonStore('./models/phone-cards.json', { phoneCards: [] }),
    collection: 'phoneCards',

    getAppInfo() {
        return this.store.findAll(this.collection);
    },

};

export default phoneCards;
