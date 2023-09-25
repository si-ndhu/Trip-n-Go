// Author: Rahul Saliya

var express = require('express');
var router = express.Router();
const { db } = require("../conn");


// Images by barnyc: https://flickr.com/photos/75487768@N04/31628278140/in/photolist-QbTcbm-naDN9o-8tF7Y3-bpQQFi-DDnvj9-hnwqti-JRMGJH-N9vpzy-MoREwn-23mWx8L-27HZbNM-PzxcXy-dkdGBH-MC55mp-CRe2wH-ddngBy-5pBL9K-aimadp-atdUU9-6KBNJ3-fnqbB2-7kPfy7-9yQB4D-27yjzhM-26h2CDK-Zow8Ti-SwsNoj-7mLDRp-T9MWwY-21LYYPn-25X7Hrm-Xx4bVM-GWeFwT-Jn58bR-DGZcAy-E8i7yj-uxLmC3-bBeBGg-bB2AyU-DKb97-KxECR9-Gcrv2e-oVgqQC-28MX46G-yJVjVY-Xvs96Y-Q2kHof-pcJooL-W9WpXW-Gw2QEA/
const popularTrips = [
    {
        id: 1,
        title: "Halifax",
        location: "Halifax, Nova Scotia",
        cost: 1000,
        rating: 4.9,
        image: "https://live.staticflickr.com/7460/13892714966_ae06a2ee97_c_d.jpg",
        description: "Halifax, an Atlantic Ocean port in eastern Canada, is the provincial capital of Nova Scotia. A major business centre, it’s also known for its maritime history. The city’s dominated by the hilltop Citadel, a star-shaped fort completed in the 1850s. ",
    }, {
        id: 2,
        title: "Montreal",
        location: "Montreal, Quebec",
        cost: 750,
        rating: 4.8,
        image: "https://live.staticflickr.com/4115/4907675570_b3f712812e_c_d.jpg",
        description: "Montreal is the largest city in Canada's Québec province. It’s set on an island in the Saint Lawrence River and named after Mt. Royal, the triple-peaked hill at its heart. Its boroughs, many of which were once independent cities, include neighbourhoods ranging from cobblestoned, French colonial Vieux-Montréal – with the Gothic Revival Notre-Dame Basilica at its centre – to bohemian Plateau.",
    }, {
        id: 3,
        title: "Windsor",
        location: "Windsor, Ontario",
        cost: 400,
        rating: 4.5,
        image: "https://live.staticflickr.com/7009/6833376215_fc29930224_c_d.jpg",
        description: "Windsor is a city in Ontario, Canada, situated on the south bank of the Detroit River directly across from Detroit, Michigan. Located in Essex County, it is the southernmost city in Canada and marks the southwestern end of the Quebec City–Windsor Corridor.",
    },
];
/* GET featured trips listing. */
router.get('/popular-trips', async function (req, res, next) {
    const trips = [];

    // get first three entries from TravelPackage mongo document
    const database = await db();
    const travelPackages = await database.collection("TravelPackages").find({}).toArray();

    for (let i = 0; i < travelPackages.length; i++) {
        trips.push(travelPackages[i]);
        if (trips.length === 3)
            break;
    }

    res.send({
        trips: trips
    });
});

// Images by barnyc: https://flickr.com/photos/75487768@N04/31628278140/in/photolist-QbTcbm-naDN9o-8tF7Y3-bpQQFi-DDnvj9-hnwqti-JRMGJH-N9vpzy-MoREwn-23mWx8L-27HZbNM-PzxcXy-dkdGBH-MC55mp-CRe2wH-ddngBy-5pBL9K-aimadp-atdUU9-6KBNJ3-fnqbB2-7kPfy7-9yQB4D-27yjzhM-26h2CDK-Zow8Ti-SwsNoj-7mLDRp-T9MWwY-21LYYPn-25X7Hrm-Xx4bVM-GWeFwT-Jn58bR-DGZcAy-E8i7yj-uxLmC3-bBeBGg-bB2AyU-DKb97-KxECR9-Gcrv2e-oVgqQC-28MX46G-yJVjVY-Xvs96Y-Q2kHof-pcJooL-W9WpXW-Gw2QEA/
const tripsNearYou = [
    {
        id: 4,
        title: "British Columbia",
        location: "British Columbia, Canada",
        cost: 1500,
        rating: 4.1,
        image: "https://live.staticflickr.com/401/31628278140_17bb9f1fd8_c_d.jpg",
        description: "British Columbia, Canada’s westernmost province, is defined by its Pacific coastline and mountain ranges. Nature areas like Glacier National Park offer hiking and biking trails, as well as campgrounds. Whistler Blackcomb is a major ski resort that hosted the 2010 Winter Olympics. The scenic Sea-to-Sky Highway links Whistler with Vancouver, a city known for its film industry, at the province’s southern U.S. border.",
    }, {
        id: 5,
        title: "Manitoba",
        location: "Manitoba, Canada",
        cost: 550,
        rating: 4.3,
        image: "https://live.staticflickr.com/5737/30288680862_5c9e8248f4_c_d.jpg",
        description: "Manitoba is a Canadian province bordered by Ontario to the east and Saskatchewan to the west. Its landscape of lakes and rivers, mountains, forests and prairies stretches from northern Arctic tundra to Hudson Bay in the east and southern farmland. Much wilderness is protected in more than 80 provincial parks, where hiking, biking, canoeing, camping and fishing are all popular.",
    }, {
        id: 6,
        title: "Calgary",
        location: "Calgary, Alberta",
        cost: 1200,
        rating: 4.2,
        image: "https://live.staticflickr.com/5537/31228301162_8dddd9450d_c_d.jpg",
        description: "Calgary, a cosmopolitan Alberta city with numerous skyscrapers, owes its rapid growth to its status as the centre of Canada’s oil industry. However, it’s still steeped in the western culture that earned it the nickname “Cowtown,” evident in the Calgary Stampede, its massive July rodeo and festival that grew out of the farming exhibitions once presented here.",
    }
];
/* GET near you trips listing. */
router.get('/trips-near-you', async function (req, res, next) {
    const trips = [];

    // get last three entries from TravelPackage mongo document
    const database = await db();
    const travelPackages = await database.collection("TravelPackages").find({}).toArray();

    for (let i = travelPackages.length - 1; i >= 0; i--) {
        trips.push(travelPackages[i]);
        if (trips.length === 3)
            break;
    }

    res.send({
        trips: trips
    });
});

module.exports = router;
