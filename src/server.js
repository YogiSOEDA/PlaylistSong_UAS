require('dotenv').config();

const Hapi = require('@hapi/hapi');

//Songs
const songs = require('./api/songs');
const SongService = require('./services/db/SongsService')
const SongsValidator = require('./validator/songs')

//Playlists
const playlists = require('./api/playlists');
const PlaylistService = require('./services/db/PlaylistsService')
const PlaylistsValidator = require('./validator/playlists')

const init = async () => {
    const songsService = new SongService();
    const playlistsService = new PlaylistService();


    const server = Hapi.server({
        port : process.env.PORT,
        host : process.env.HOST,

    });

    await server.register([
        {
            plugin: songs,
            options: {
                service : songsService,
                validator : SongsValidator
            }
        },
        {
            plugin: playlists,
            options: {
                service : playlistsService,
                validator : PlaylistsValidator
            }
        },

    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}
init();