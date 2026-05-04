'use strict';

import logger from '../utils/logger.js';
import phoneStore from '../models/phone-store.js';
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
};

export default category;