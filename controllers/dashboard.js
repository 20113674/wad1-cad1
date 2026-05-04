'use strict';

import logger from '../utils/logger.js';
import phoneStore from '../models/phone-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

const dashboard = {
    createView(request, response) {
        logger.info('Dashboard page loading!');

        const loggedInUser = accounts.getCurrentUser(request);
        if (!loggedInUser) return response.redirect('/');

        const searchTerm = request.query.searchTerm || '';

        const playlists = searchTerm
            ? phoneStore.searchUserPlaylists(searchTerm, loggedInUser.id)
            : phoneStore.getUserPlaylists(loggedInUser.id);

        const sortField = request.query.sort;
        const order = request.query.order === 'desc' ? -1 : 1;
        let sorted = playlists;

        if (sortField) {
            sorted = playlists.slice().sort((a, b) => {
                if (sortField === 'title') {
                    return a.title.localeCompare(b.title) * order;
                }
                if (sortField === 'count') {
                    return (a.phones.length - b.phones.length) * order;
                }
                return 0;
            });
        }

        const viewData = {
            title: 'Phones Dashboard',
            fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
            playlists: sorted,
            search: searchTerm,
            titleSelected: request.query.sort === 'title',
            countSelected: request.query.sort === 'count',
            ascSelected: request.query.order !== 'desc',
            descSelected: request.query.order === 'desc',
        };

        response.render('dashboard', viewData);
    },

    async addPlaylist(request, response) {
        try {
            const loggedInUser = accounts.getCurrentUser(request);
            if (!loggedInUser) return response.redirect('/');

            const newPlaylist = {
                id: uuidv4(),
                userid: loggedInUser.id,
                title: request.body.title,
                phones: [],
            };

            const file = request.files && request.files.picture ? request.files.picture : null;
            await phoneStore.addPlaylist(newPlaylist, file);
            logger.info('Added category: ' + newPlaylist.title);
            response.redirect('/dashboard');
        } catch (err) {
            logger.error('Error adding category: ' + err);
            response.redirect('/dashboard');
        }
    },

    async deletePlaylist(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        if (!loggedInUser) return response.redirect('/');

        const playlistId = request.params.id;
        logger.debug('Deleting category: ' + playlistId);
        await phoneStore.removePlaylist(playlistId);
        response.redirect('/dashboard');
    },
};

export default dashboard;