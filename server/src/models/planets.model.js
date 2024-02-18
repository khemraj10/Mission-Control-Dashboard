const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const planets = require('./planets.mongo');

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true,
        }))
        .on('data', async (data) => {
            if (isHabitablePlanet(data)) {
                // TODO: Replace below create with upsert
                // habitablePlanets.push(data);
                // insert + update = upsert
                // await planets.create({
                //     keplerName: data.kepler_name,
                // });
                savePlanet(data);
            }
        })
        .on('error', (error) => {
            console.log(error);
        })
        .on('end', async () => {
            const countPlanetsFound = (await getAllPlanets()).length;
            console.log(`${countPlanetsFound} habitable planets found!`);
        });
}

async function getAllPlanets() {
    // return habitablePlanets;
//     return planets.find({
//         keplerName: 'Kepler-62 f',
//     // }, { 'keplerName': 0 });
// }, '-keplerName anotherfield' );
    return await planets.find({}, {
        '_id': 0, '__v': 0,
    });
}

async function savePlanet(data) {
    try {        
        await planets.updateOne({
            keplerName: data.kepler_name,
        }, {
            keplerName: data.kepler_name
        }, {
            upsert: true,
        });
    } catch (err) {
        // console.log(err);
        console.error(`Could not save planet ${err}`);
    }
}

module.exports = {
    loadPlanetsData,
    getAllPlanets,
}