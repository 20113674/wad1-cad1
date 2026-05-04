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

    async addPlaylist(playlist, file) {
        if (file) {
            try {
                playlist.picture = await this.store.addToCloudinary(file);
            } catch (err) {
                logger.warn('Cloudinary upload failed, saving without image: ' + err);
            }
        }
        await this.store.addCollection(this.collection, playlist);
    },

    async removePlaylist(id) {
        const cat = this.getPlaylist(id);
        if (cat && cat.picture && cat.picture.public_id) {
            try {
                await this.store.deleteFromCloudinary(cat.picture.public_id);
            } catch (err) {
                logger.error('Cloudinary delete failed: ' + err);
            }
        }
        if (cat) await this.store.removeCollection(this.collection, cat);
    },

    async addPhone(categoryId, phone, file) {
        if (file) {
            try {
                phone.img = await this.store.addToCloudinary(file);
            } catch (err) {
                logger.warn('Cloudinary upload failed, saving without image: ' + err);
            }
        }
        await this.store.addItem(this.collection, categoryId, this.array, phone);
    },

    async removePhone(categoryId, phoneId) {
        await this.store.removeItem(this.collection, categoryId, this.array, phoneId);
    },

    async editPhone(categoryId, phoneId, updatedPhone) {
        await this.store.editItem(this.collection, categoryId, phoneId, this.array, updatedPhone);
    },
};

export default phoneStore;