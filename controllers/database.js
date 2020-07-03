const path = require('path')
const fs = require('fs');
const { callbackify } = require('util');
const { getAllCubes } = require('./cubes');

const databaseFile = path.join(__dirname, '..', '/config/database.json')

const saveCube = () => {
    getCubes((cubes) => {
        cubes.push(cube);

        fs.writeFile( databaseFile, JSON.stringify(cubes),'utf-8', error => {
            if (error) {
                throw error
            }

            console.log('The Cube is successfully saved!')
        });
    });
}

const getCube = (id, callback) => {
    getCubes((cubes) => {
        const cube = cubes.filter(c => c.id === id)[0];
        callback(cube);
    })
}

const getCubes = (callback) => {
    fs.readFile( databaseFile, (error, dbData) => {
        if (error) {
           throw error
        }

        const cubes = JSON.parse(dbData);
        callback(cubes);
    });
}

module.exports = {
    getCube,
    getCubes,
    saveCube
}