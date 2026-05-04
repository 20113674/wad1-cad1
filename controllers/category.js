'use strict';

import logger from '../utils/logger.js';
import phoneStore from '../models/phone-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const category = {
    createView(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        if (!loggedInUser) return response.redirect('/');

        const phoneId = request.params.id;
        logger.debug(`Category id = ${phoneId}`);

        const viewData = {
            title: 'Phone Category',
            fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
            singlePlaylist: phoneStore.getPlaylist(phoneId),
        };

        response.render('category', viewData);
    },

    async addPhone(request, response) {
        const categoryId = request.params.id;
        const newPhone = {
            id: uuidv4(),
            title: request.body.title,
            brand: request.body.brand,
            price: request.body.price,
        };
        await phoneStore.addPhone(categoryId, newPhone);
        logger.info('Added phone: ' + newPhone.title);
        response.redirect('/playlist/' + categoryId);
    },

    async deletePhone(request, response) {
        const categoryId = request.params.id;
        const phoneId = request.params.phoneid;
        logger.debug('Deleting phone ' + phoneId);
        await phoneStore.removePhone(categoryId, phoneId);
        response.redirect('/playlist/' + categoryId);
    },

    async updatePhone(request, response) {
        const categoryId = request.params.id;
        const phoneId = request.params.phoneid;
        const updatedPhone = {
            id: phoneId,
            title: request.body.title,
            brand: request.body.brand,
            price: request.body.price,
        };
        await phoneStore.editPhone(categoryId, phoneId, updatedPhone);
        response.redirect('/playlist/' + categoryId);
    },
};

export default category;