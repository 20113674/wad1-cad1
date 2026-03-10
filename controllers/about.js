'use strict';

import logger from "../utils/logger.js";
import employee from "../models/employee.js";

const about = {
    createView(request, response) {
        logger.info("About page loading!");

        const employees = employee.getAppInfo();

        const viewData = {
            title: "About the Phone Ranking Information",
            employees: employees
        };

        logger.info(viewData.employees);
        response.render("about", viewData);
    },
};

export default about;
