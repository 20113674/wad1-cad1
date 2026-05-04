'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const phoneStore = {

    store: new JsonStore('./models/phone-store.json', { phoneCollection: [] }),
    collection: 'phoneCollection',
    array: 'phones',  

    getAllPlaylists() {
        return this.store.findAll(this.collection);
    },
    getPlaylist(id) {
        return this.store.findOneBy(this.collection, (phone => phone.id === id));
    },

};

export default phoneStore;
