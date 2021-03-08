const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 200; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '6040a9155414c32229a83caa',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			images: [
				{
					url: 'https://res.cloudinary.com/derc3x7vc/image/upload/v1615173277/YelpCamp/ofxiqk7ilgukb0f6hh3d.jpg',
					filename: 'YelpCamp/ofxiqk7ilgukb0f6hh3d'
				  },
				  {
					url: 'https://res.cloudinary.com/derc3x7vc/image/upload/v1615173278/YelpCamp/opn139elgkpltvwgffbv.png',
					filename: 'YelpCamp/opn139elgkpltvwgffbv'
				  },
				  {
					url: 'https://res.cloudinary.com/derc3x7vc/image/upload/v1615173279/YelpCamp/v1dr4gabdczt2ouvedys.jpg',
					filename: 'YelpCamp/v1dr4gabdczt2ouvedys'
				  }
			],
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit atque corrupti dolor non ipsum blanditiis sapiente, veritatis reiciendis veniam doloremque! Quaerat magni, ea dolore optio ipsum cum nobis quibusdam voluptas?',
			price: price,
			geometry: {
				type: 'Point',
				coordinates: [ cities[random1000].longitude, cities[random1000].latitude ]
			}
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
