const {v4} = require('uuid');
const fs = require('fs')
const path = require('path');
const { throws } = require('assert');

const databaseFile = path.join(__dirname, '..', '/config/database.json')

class Cube {
    constructor(name, description, imageUrl, difficulty){
        this.id = v4();
        this.name = name || 'No Name';
        this.description = description;
        this.imageUrl = imageUrl || 'placeholder';
        this.difficulty = difficulty || 0;
    }

    //Save Cube
    save(){
        const newCube = {
        //You could make some validation here
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty
        }

        fs.readFile( databaseFile, (error, dbData) => {
            if (error) {
               throw error
            }

            const cubes = JSON.parse(dbData);
            cubes.push(newCube);

            fs.writeFile( databaseFile, JSON.stringify(cubes),'utf-8', error => {
                if (error) {
                    throw error
                }
    
                console.log('The Cube is successfully saved!')
            });
        });

    }
}

module.exports = Cube