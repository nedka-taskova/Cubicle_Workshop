const Cube = require("../models/cube")


const newCube = new Cube('Default Cube', 'Description', 'https://google.com', 1);
console.log(newCube);

newCube.save();

