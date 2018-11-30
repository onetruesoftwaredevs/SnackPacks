import React from 'react';
import {GMAP_API_KEY} from "../function/Constants";

class ETAModule {

    static getTime(lat_a, long_a, lat_b, long_b) {
        let url = "http://maps.googleapis.com/maps/api/distancematrix/json?";
        url += "origins=" + long_a + "," + lat_a;
        url += "&destinations=" + long_b + "," + lat_b;
        url += "&key=" + GMAP_API_KEY;
        fetch(url, {method: "GET"})
            .then(response => response.json())
            .then(responseJson => {
                ETAModule.time = responseJson.rows[0].elements[0].duration.text;
            });
    }

}


module.exports = ETAModule;