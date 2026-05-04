'use strict';

import logger from '../utils/logger.js';
import appStore from '../models/app-store.js';
import accounts from './accounts.js';

const aboutme = {
    createView(request, response) {
        logger.info('About Me page loading!');

        const loggedInUser = accounts.getCurrentUser(request);
        if (!loggedInUser) return response.redirect('/');

        const viewData = {
            title: 'About Me',
            fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
            info: appStore.getAppInfo(),
        };

        response.render('aboutme', viewData);
    },
};

export default aboutme;