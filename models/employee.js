'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const employee = {

    store: new JsonStore('./models/employee.json', { employees: [] }),
    collection: 'employees',

    getAppInfo() {
        return this.store.findAll(this.collection);
    },


};


export default employee;
