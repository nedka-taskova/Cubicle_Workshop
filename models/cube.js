const {v4} = require( 'uuid');
const 

class Cube {
    constructor(name, description, imageUrl, difficulty){
        this.id = v4();
        this.name = name || 'No Name';
        this.description = description;
        this.imageUrl = imageUrl || 'placeholder';
        this.difficulty = difficulty || 0;
    }
}

module.exports = Cube