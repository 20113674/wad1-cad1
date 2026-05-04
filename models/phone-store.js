'use strict';

import JsonStore from './json-store.js';
import logger from '../utils/logger.js';

const phoneStore = {
    store: new JsonStore('./models/phone-store.json', { phoneCollection: [] }),
    collection: 'phoneCollection',
    array: 'phones',

    getAllPlaylists() {
        return this.store.findAll(this.collection);
    },

    getPlaylist(id) {
        return this.store.findOneBy(this.collection, (cat) => cat.id === id);
    },

    getUserPlaylists(userid) {
        return this.store.findBy(this.collection, (cat) => cat.userid === userid);
    },

    searchUserPlaylists(search, userid) {
        return this.store.findBy(
            this.collection,
            (cat) =>
                cat.userid === userid &&
                cat.title.toLowerCase().includes(search.toLowerCase())
        );
    },

    async addPlaylist(playlist) {
        await this.store.addCollection(this.collection, playlist);
    },

    async removePlaylist(id) {
        const cat = this.getPlaylist(id);
        if (cat) await this.store.removeCollection(this.collection, cat);
    },
};

export default phoneStore;