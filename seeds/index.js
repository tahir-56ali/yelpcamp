const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database Connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63d16b7a53347d0550097cc0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam consequatur voluptates ullam, repellat doloremque nesciunt aut id quidem exercitationem quos, accusantium aliquam tempore beatae quia eius porro placeat minima sapiente.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dmhxssqb6/image/upload/v1674842793/YelpCamp/kvmrm303kjtq7fqmbcrt.jpg',
                    filename: 'YelpCamp/kvmrm303kjtq7fqmbcrt',
                },
                {
                    url: 'https://res.cloudinary.com/dmhxssqb6/image/upload/v1674842792/YelpCamp/ckyyuajdv1e3kuxziiwe.jpg',
                    filename: 'YelpCamp/ckyyuajdv1e3kuxziiwe',
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});