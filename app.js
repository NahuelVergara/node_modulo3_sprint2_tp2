const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://grupo-01:grupo01@cursadanodejs.ls9ii.mongodb.net/Node-js').then(() =>{
    console.log('Conexión exitosa a la base de datos');
}).catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});

const superheroeSchema = new mongoose.Schema({
    nombreSuperheroe: {
        type: String,
        required: true
    },

    nombreReal: {
        type: String,
        required: true
    },

    edad: {
        type: Number,
        min: 0
    },

    planetaOrigen: {
        type: String,
        default: 'Desconocido'
    },

    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createAt: {
        type: Date,
        default: Date.now
    },
    creador: String,
},   { collection: 'Grupo-01'});

const SuperHero = mongoose.model('SuperHero', superheroeSchema);

async function insertarSuperHero() {
    const hero = new SuperHero({
        nombreSuperheroe: 'Spiderman',
        nombreReal: 'Peter Parker',
        edad: 18,
        planetaOrigen: 'Tierra',
        debilidad: 'Arañas',
        poderes: ['Trepar paredes', 'Sentido arácnido', 'Super fuerza', 'Agilidad'],
        aliados: ['Iroman'],
        enemigos: ['Duende Verde', 'Venom'],
        creador: 'Martin'
    });
    await  hero.save();
    console.log('Superhéroe insertado:', hero);
}
insertarSuperHero();

async function updateSuperHero(nombreSuperheroe) {
    const result = await SuperHero.updateOne(
        {nombreSuperheroe: nombreSuperheroe},
        {$set: {edad: 25}}
    );
    console.log('Resultado de la actualización:', result);
}

updateSuperHero('Spiderman');

async function deleteSuperHero(nombreSuperheroe) {
    const result = await SuperHero.deleteOne({nombreSuperheroe: nombreSuperheroe});
    console.log('Superheroe elimando:', result);
}
deleteSuperHero('Spiderman');

async function findSuperHero() {
    const heroes = await SuperHero.find({planetaOrigen: 'Tierra'});
    console.log('Superhéroes encontrados:', heroes);
}
findSuperHero();

