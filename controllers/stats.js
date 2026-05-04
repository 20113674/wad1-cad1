'use strict';

import logger from '../utils/logger.js';
import phoneStore from '../models/phone-store.js';
import userStore from '../models/user-store.js';
import accounts from './accounts.js';

const stats = {
    createView(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        if (!loggedInUser) return response.redirect('/');

        logger.info('Stats page loading!');

        const allCategories = phoneStore.getAllPlaylists();
        const allUsers = userStore.getAllUsers();

        // Global stats
        const totalCategories = allCategories.length;
        const totalPhones = allCategories.reduce((sum, c) => sum + c.phones.length, 0);
        const avgPhones = totalCategories > 0
            ? (totalPhones / totalCategories).toFixed(2)
            : 0;
        const totalUsers = allUsers.length;

        const maxPhones = allCategories.length > 0
            ? Math.max(...allCategories.map((c) => c.phones.length))
            : 0;
        const largestCategories = allCategories
            .filter((c) => c.phones.length === maxPhones)
            .map((c) => c.title);

        // User with most categories
        const userCatCounts = allUsers.map((u) => ({
            name: u.firstName + ' ' + u.lastName,
            count: allCategories.filter((c) => c.userid === u.id).length,
        }));
        const maxCats = Math.max(...userCatCounts.map((u) => u.count), 0);
        const topUsers = userCatCounts
            .filter((u) => u.count === maxCats && maxCats > 0)
            .map((u) => u.name);

        // Current user stats
        const myCategories = phoneStore.getUserPlaylists(loggedInUser.id);
        const myPhoneCount = myCategories.reduce((sum, c) => sum + c.phones.length, 0);
        const myAvg = myCategories.length > 0
            ? (myPhoneCount / myCategories.length).toFixed(2)
            : 0;
        const myMax = myCategories.length > 0
            ? Math.max(...myCategories.map((c) => c.phones.length))
            : 0;
        const myMin = myCategories.length > 0
            ? Math.min(...myCategories.map((c) => c.phones.length))
            : 0;

        const viewData = {
            title: 'Phone Tracker Statistics',
            fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
            stats: {
                totalCategories,
                totalPhones,
                avgPhones,
                totalUsers,
                maxPhones,
                largestCategories,
                topUsers,
                myCategories: myCategories.length,
                myPhoneCount,
                myAvg,
                myMax,
                myMin,
            },
        };

        response.render('stats', viewData);
    },
};

export default stats;