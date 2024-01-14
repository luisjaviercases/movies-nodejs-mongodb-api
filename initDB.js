import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './api/models/userModel.js';
import Genre from './api/models/genreModel.js';
import Movie from './api/models/movieModel.js';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

let newUser;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to MongoDB');

  // Delete all documents in collections before inserting new ones
  Promise.all([
    User.deleteMany({}),
    Movie.deleteMany({}),
    Genre.deleteMany({})
  ])
    .then(() => {
      console.log('Deleted all documents in the User, Movie and Genre collections.');

      // Create an initial user
      newUser = new User({
        _id: '659fe2476fd226269655d733',
        fullName: 'test',
        email: 'test@test.com',
        hash_password: bcrypt.hashSync('test', 10)
      });

      // Crear genres
      const defaultGenres = [
        {
          "_id": "e4f21b5a-5235-4b35-a26b-f88fd94da066",
          "name": "Thrillers"
        },
        {
          "_id": "9cec0d28-3237-4754-ac3b-f8ac035c91f8",
          "name": "Drama"
        },
        {
          "_id": "22f9f9a3-c84c-4d28-81f5-218d87cc41f5",
          "name": "Comedy"
        }
      ];

      const genrePromises = defaultGenres.map(genre => new Genre(genre).save());

      return Promise.all([
        newUser.save(),
        ...genrePromises
      ]);
    })
    .then(([...genres]) => {
      console.log('Initial user and genres successfully added.');

      // Add movies by default
      const defaultMovies = [
        {
          "highlighted": false,
          "rating": 5,
          "poster": "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/BCWNAG4MNRBSLHAM7COBNDWIJM.jpg",
          "cast": "Mike Wazowski, Sulley, Boo",
          "thumbnail": "https://lumiere-a.akamaihd.net/v1/images/p_monstersinc_19751_55afa07a.jpeg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "e9e422bd-ea4a-4227-a0a6-621affbe52a3",
          "genre": "22f9f9a3-c84c-4d28-81f5-218d87cc41f5",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "monster, INC."
        },
        {
          "highlighted": false,
          "rating": 4,
          "poster": "https://media.revistagq.com/photos/63e213a8f184f7f95f6c9c23/master/pass/james-cameron-titanic-error-pelicula.jpg",
          "cast": "Kate Winslet, Leonardo DiCaprio",
          "thumbnail": "https://m.media-amazon.com/images/I/51nbDBJ2h3L._AC_SY450_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "b3a1adef-f014-4f97-94cd-9f5aa3a84fd5",
          "genre": "22f9f9a3-c84c-4d28-81f5-218d87cc41f5",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "titanic"
        },
        {
          "highlighted": false,
          "rating": 5,
          "poster": "https://fotografias.antena3.com/clipping/cmsimages02/2016/04/21/79E3271F-EB44-4C85-9589-DE2E116EAA6D/98.jpg?crop=1200,675,x0,y0&width=1900&height=1069&optimize=high&format=webply",
          "cast": "Brad Pitt, Jason Statham, Vinnie Jones",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTA2NDYxOGYtYjU1Mi00Y2QzLTgxMTQtMWI1MGI0ZGQ5MmU4XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_FMjpg_UX1000_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "816c823e-3240-4a35-b18d-365b551dac04",
          "genre": "22f9f9a3-c84c-4d28-81f5-218d87cc41f5",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "snatch"
        },
        {
          "highlighted": false,
          "rating": 4,
          "poster": "https://pics.filmaffinity.com/leon_leon-148859434-large.jpg",
          "cast": "Jean Reno, Natalie Portman",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BZDAwYTlhMDEtNTg0OS00NDY2LWJjOWItNWY3YTZkM2UxYzUzXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "c87b3f09-9339-4eb9-adbc-f3cc214601e1",
          "genre": "e4f21b5a-5235-4b35-a26b-f88fd94da066",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "l��on"
        },
        {
          "highlighted": false,
          "rating": 4,
          "poster": "https://thecinemaholic.com/wp-content/uploads/2022/01/Remini20220126130307911-1-e1643186781601.jpg",
          "cast": "Tom Hardy, Joel Edgerton",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTk4ODk5MTMyNV5BMl5BanBnXkFtZTcwMDMyNTg0Ng@@._V1_FMjpg_UX1000_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "7f5f49d2-2029-41f3-abcb-01db97d1057c",
          "genre": "22f9f9a3-c84c-4d28-81f5-218d87cc41f5",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "the warrior"
        },
        {
          "highlighted": false,
          "rating": null,
          "poster": "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/3ce8d83c17def448c0c20adf4f090abe62680b7a8f453c5592d234f916b8b432._UY500_UX667_RI_V_TTW_.jpg",
          "cast": "Elijah Wood, Viggo Mortensen",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "6844ba30-d5a9-48fa-bece-fca03a69f1c3",
          "genre": "e4f21b5a-5235-4b35-a26b-f88fd94da066",
          "availableDate": "2023-03-21T11:39:15.609+00:00",
          "title": "the lord of the rings the return of the king"
        },
        {
          "highlighted": false,
          "rating": 4,
          "poster": "https://static.wikia.nocookie.net/eswikia/images/b/be/The_Hangover.png/revision/latest?cb=20160812150535",
          "cast": "Bradley Cooper, Zach Galifianakis, Ed Helms",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "1475161d-8067-499c-9210-124222970b5a",
          "genre": "22f9f9a3-c84c-4d28-81f5-218d87cc41f5",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "the hangover"
        },
        {
          "highlighted": false,
          "rating": 5,
          "poster": "https://www.magazinema.es/wp-content/uploads/2020/10/Shutter-Island-MagaZinema-3.jpg",
          "cast": "Leonardo Di Caprio, Mark Ruffalo",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "8727eba6-2bdb-4b9c-9083-3edaf956de96",
          "genre": "e4f21b5a-5235-4b35-a26b-f88fd94da066",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "shutter island"
        },
        {
          "highlighted": false,
          "rating": 5,
          "poster": "https://occ-0-1555-3212.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABSYEL_9_NIluJJJkoDcRVVctQBjhPVL6n9mu4FSf3wXH29hbFKmqkci2IBkVuFyGwjo6agrt_QF0meyOJ5w3hrTfVfLkSCIb2opB.jpg?r=3fe",
          "cast": "Tom Hanks, Robin Wright",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "84c7f511-ae81-4ab3-a8d0-0fea1184d45b",
          "genre": "22f9f9a3-c84c-4d28-81f5-218d87cc41f5",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "forrest gump"
        },
        {
          "highlighted": false,
          "rating": 5,
          "poster": "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/7dada20dafaaf219813e776f5992d221ceb689fa7fa51dfa74f054544047c686._RI_V_TTW_.jpg",
          "cast": "Fran��ois Cluzet, Omar Sy",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_FMjpg_UX1000_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "191a2531-27cc-4426-9913-dae1101df764",
          "genre": "22f9f9a3-c84c-4d28-81f5-218d87cc41f5",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "intouchables"
        },
        {
          "highlighted": true,
          "rating": 5,
          "poster": "https://static3.srcdn.com/wordpress/wp-content/uploads/2021/09/Daniel-Day-Lewis-and-Jared-Harris-in-Lincoln-Cropped.jpg",
          "cast": "Daniel Day-Lewis",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTQzNzczMDUyNV5BMl5BanBnXkFtZTcwNjM2ODEzOA@@._V1_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "0b9d0c7f-9331-4051-b4f2-565336c1fff1",
          "genre": "9cec0d28-3237-4754-ac3b-f8ac035c91f8",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "lincon"
        },
        {
          "highlighted": true,
          "rating": 4,
          "poster": "https://i0.wp.com/crast.net/img/2023/01/The-Last-of-Us-series-how-many-episodes-will.jpg?resize=1140,570",
          "cast": "Pedro Pascal, Bella Ramsey",
          "thumbnail": "https://pics.filmaffinity.com/The_Last_of_Us_Serie_de_TV-722385305-large.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "e9bcae8b-31d1-4de9-9e63-86f85df27893",
          "genre": "e4f21b5a-5235-4b35-a26b-f88fd94da066",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "last of us"
        },
        {
          "highlighted": true,
          "rating": 5,
          "poster": "https://hips.hearstapps.com/es.h-cdn.co/fotoes/images/noticias/los-coen-rehacen-true-grit/4018325-1-esl-ES/Los-Coen-rehacen-True-Grit.jpg",
          "cast": "Jeff Bridges, Hailee Steinfeld",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTU5MjU3MTI4OF5BMl5BanBnXkFtZTcwMTQxOTAxNA@@._V1_FMjpg_UX1000_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "3b3d7a32-6f5e-4769-b9aa-81ca74eb5a00",
          "genre": "9cec0d28-3237-4754-ac3b-f8ac035c91f8",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "true grit"
        },
        {
          "highlighted": false,
          "rating": null,
          "poster": "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/3ce8d83c17def448c0c20adf4f090abe62680b7a8f453c5592d234f916b8b432._UY500_UX667_RI_V_TTW_.jpg",
          "cast": "Tom Holland, Zendaya",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "67e1cdaf-3411-4831-b3d1-ea6a74cdae6d",
          "genre": "e4f21b5a-5235-4b35-a26b-f88fd94da066",
          "availableDate": "2023-03-21T11:39:15.609+00:00",
          "title": "the lord of the rings the return of the king"
        },
        {
          "highlighted": false,
          "rating": null,
          "poster": "https://movierob.files.wordpress.com/2015/04/harry-potter-3-harry-potter-990668_800_600.jpg?w=800",
          "cast": "Daniel Radcliffe, Emma Watson, Rupert Grint",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "0ff296dc-79e9-4a2a-878e-5a100de3cf1b",
          "genre": "e4f21b5a-5235-4b35-a26b-f88fd94da066",
          "availableDate": "2023-03-21T11:39:15.609+00:00",
          "title": "harry potter and the prisoner of azkaban"
        },
        {
          "highlighted": false,
          "rating": 4,
          "poster": "https://img2.rtve.es/i/?w=1600&i=1636651767026.jpg",
          "cast": "Christian Bale, Jared Leto",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BZTM2ZGJmNjQtN2UyOS00NjcxLWFjMDktMDE2NzMyNTZlZTBiXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "2c5567e3-d649-403d-9871-8746021ced4e",
          "genre": "e4f21b5a-5235-4b35-a26b-f88fd94da066",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "american psycho"
        },
        {
          "highlighted": false,
          "rating": 5,
          "poster": "https://pics.filmaffinity.com/Memento-556783951-large.jpg",
          "cast": "Guy Pearce, Carrie-Anne Moss",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "416c87a8-37f2-44a1-8281-6740426059c1",
          "genre": "e4f21b5a-5235-4b35-a26b-f88fd94da066",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "memento"
        },
        {
          "highlighted": true,
          "rating": 5,
          "poster": "https://i0.wp.com/crast.net/img/2023/01/The-Last-of-Us-series-how-many-episodes-will.jpg?resize=1140,570",
          "cast": "Daniel Day-Lewis, Paul Dano",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BMjAxODQ4MDU5NV5BMl5BanBnXkFtZTcwMDU4MjU1MQ@@._V1_FMjpg_UX1000_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "b181ead6-e6b4-4744-9aa4-72f523d33583",
          "genre": "e4f21b5a-5235-4b35-a26b-f88fd94da066",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "there will be blood"
        },
        {
          "highlighted": false,
          "rating": 4,
          "poster": "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/7c168ffd86440bb464b4612f94bcd3929208c483df2deda58084e75bece42d32._RI_V_TTW_.png",
          "cast": "Christian Bale, Jennifer Jason Leigh",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTYyNzE4NDM2M15BMl5BanBnXkFtZTcwMDkyMDkyMQ@@._V1_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "b0288681-f6b6-4191-bf3c-5b647dead40b",
          "genre": "e4f21b5a-5235-4b35-a26b-f88fd94da066",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "the machinist"
        },
        {
          "highlighted": false,
          "rating": 5,
          "poster": "https://static.filmin.es/images/media/17345/3/still_2_3_1360x765.webp",
          "cast": "Kang Hye-jung, Choi Min-sik",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BZWZkNjVhZDEtZTNkZi00OWIxLTk3N2UtNjBkMjgzZGMwMDI2XkEyXkFqcGdeQXVyMTAyOTE2ODg0._V1_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "eb0b1669-8b77-4028-a8be-52c470e803bd",
          "genre": "e4f21b5a-5235-4b35-a26b-f88fd94da066",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "old boy"
        },
        {
          "highlighted": false,
          "rating": 5,
          "poster": "https://imgtoolkit.culturebase.org/?color=FFFFFF&quality=8&ar_ratio=1.3&format=jpg&file=https%3A%2F%2Fimg.culturebase.org%2F7%2Ff%2F3%2F2%2F4%2Fpic_1499785435_7f3241b12620a71d548750c353e09b88.jpeg&do=cropOut&width=1200&height=780",
          "cast": "Jamie Bell, Gary Lewis",
          "thumbnail": "https://s3.amazonaws.com/static.rogerebert.com/uploads/movie/movie_poster/billy-elliot-2000/large_1KpdJnXPJJhdurxCQtkJ5Hf5C69.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "2337b495-305b-4bac-9247-adb03eac1ee7",
          "genre": "22f9f9a3-c84c-4d28-81f5-218d87cc41f5",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "billy elliot"
        },
        {
          "highlighted": false,
          "rating": 5,
          "poster": "https://img.aullidos.com/imagenes/noticias/tw-34951.jpg",
          "cast": "Daniel Radcliffe, Paul Dano",
          "thumbnail": "https://m.media-amazon.com/images/I/51nbDBJ2h3L._AC_SY450_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "28d00af6-9173-4773-ad89-7a68002f4691",
          "genre": "22f9f9a3-c84c-4d28-81f5-218d87cc41f5",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "swiss army man"
        },
        {
          "highlighted": false,
          "rating": null,
          "poster": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/_aeg2_card.jpg",
          "cast": "Robert Downey Jr., Chris Evans, Scarlett Johansson",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1000_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "1ab36e4d-1e9a-4edc-acfb-cdda5012649e",
          "genre": "e4f21b5a-5235-4b35-a26b-f88fd94da066",
          "availableDate": "2023-03-21T11:39:15.609+00:00",
          "title": "avengers: endgame"
        },
        {
          "highlighted": false,
          "rating": null,
          "poster": "https://phantom-marca.unidadeditorial.es/31e07386c26ba5579466aebf0eda44ff/resize/1200/f/webp/assets/multimedia/imagenes/2021/12/16/16396734470903.jpg",
          "cast": "Tom Holland, Zendaya",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BOGRkMDgwMjMtZmFkZi00NjEwLTllMDktMDcxZmQxYmYwNTVlXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "c2e7f7b6-58c0-445b-9606-e98cfceb48e9",
          "genre": "e4f21b5a-5235-4b35-a26b-f88fd94da066",
          "availableDate": "2023-03-21T11:39:15.609+00:00",
          "title": "spider-man: no way home"
        },
        {
          "highlighted": false,
          "rating": 5,
          "poster": "https://occ-0-1555-116.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABU0WWbMcQoMT270LxqG0J8-NQJLprJqAFCmAIGvO9pA2SSZ4Udw28uKggtG0QgmO60jvIAcfNZmWZ5XlOeWF5whRvL3KFxCdjwhY.jpg?r=15e",
          "cast": "Adam Sandler, Jennifer Aniston",
          "thumbnail": "https://m.media-amazon.com/images/M/MV5BNTA2YTI5YjUtZWI4Zi00NWQ5LWFiYmEtOTBmNTUyNDAwNjllXkEyXkFqcGdeQXVyNjIzNzM4NzA@._V1_.jpg",
          "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus diam nunc, in dapibus tellus pulvinar nec. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc quam quam, fringilla condimentum justo eu, rhoncus venenatis nunc. Mauris suscipit dignissim enim, eget interdum lacus feugiat eget. Quisque ac ligula id arcu vulputate pulvinar vitae vel mauris. Mauris convallis lectus vel tristique commodo. Mauris dapibus tincidunt felis, nec feugiat nulla vulputate at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla fermentum pharetra diam nec tempor. Praesent eget ex sit amet nunc euismod varius vel ac eros. Maecenas at maximus nulla. Donec eget urna a augue aliquam fringilla. Curabitur sed lectus ut sapien blandit malesuada. Sed eget lobortis risus, eu elementum velit. Curabitur pulvinar ultricies massa.",
          "_id": "9c215b7a-5d83-4936-8984-a40a1ef8cb43",
          "genre": "9cec0d28-3237-4754-ac3b-f8ac035c91f8",
          "availableDate": "2023-01-27T11:39:15.609+00:00",
          "title": "murder mystery"
        }
      ];

      const moviePromises = defaultMovies.map(movie => {
        const genreIds = genres.map(genre => genre._id);
        movie.genre = genreIds[Math.floor(Math.random() * genreIds.length)]; // Asignar un género aleatorio
        return new Movie(movie).save();
      });

      return Promise.all(moviePromises);
    })
    .then((movies) => {
      console.log('Movies added successfully.');

      // Add a movie as a user's favorite
      const favoriteMovie = movies[0]; // We chose the first one in the array, but we could have chosen any

      if (!newUser.favoriteMovies) {
        newUser.favoriteMovies = [];
      }
    
      newUser.favoriteMovies.push(favoriteMovie._id);
      return newUser.save();
    })
    .then(() => {
      console.log('Favorite movie added to user.');
      // Close connection after adding user, genres, movies and favorite movie
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error('Error when adding user, genres, movies and favorite movie:', err);
      // Close the connection in case of error
      mongoose.connection.close();
    });
}, (err) => {
  console.error('Error connecting to MongoDB:', err);
});