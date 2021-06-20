const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/evocativeio", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      author: "60c9ec437dc9bb333cd86fd0",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga alias ea velit sequi iusto! Assumenda maiores in exercitationem cumque, placeat sequi modi necessitatibus illo eligendi dignissimos hic asperiores distinctio? Quod?",
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/abhibhab/image/upload/v1623957194/yelpcamp/klb7ovcdupkkjmjwmi10.jpg",
          filename: "yelpcamp/klb7ovcdupkkjmjwmi10",
        },
        {
          url: "https://res.cloudinary.com/abhibhab/image/upload/v1623957197/yelpcamp/taifqdfevd3qybkujs3c.jpg",
          filename: "yelpcamp/taifqdfevd3qybkujs3c",
        },
        {
          url: "https://res.cloudinary.com/abhibhab/image/upload/v1623957199/yelpcamp/gzdg2kdfzjljmik4asr1.jpg",
          filename: "yelpcamp/gzdg2kdfzjljmik4asr1",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
