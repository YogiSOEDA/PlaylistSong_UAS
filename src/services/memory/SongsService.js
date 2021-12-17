const {nanoid} = require("nanoid");

class SongsService {
    constructor() {
        this._songs = [];
    }

    addSong({title, year, artist, gendre, duration}){
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newSong = {
            id, title, year, artist, gendre, duration, createdAt, updatedAt
        }
        this._songs.push(newSong);
        const isSuccess = this._songs.filter((song) => song.id === id).length > 0;
        if (!isSuccess){
            throw new Error("Song gagal ditambahkan");
        }
        return id;
    }

    getSongs(){
        return this._songs;
    }

    getSongById(id){
        const song = this._songs.filter((song) => song.id === id)[0];
        if (!song){
            throw new Error("Song tidak ditemukan");
        }
        return song;
    }

    editSongById(id,{title, year, artist, gendre, duration}){
        const index = this._songs.findIndex((song) => song.id === id);

        if (index === -1){
            throw new Error("Gagal mempaharaui song, song tidak ditemukan");
        }
        const updatedAt = new Date().toISOString();
        this._songs[index] = {
            ...this._songs[index],
            title,
            year,
            artist,
            gendre,
            duration,
            updatedAt
        }
    }

    deleteSongById(id){
        const index = this._songs.findIndex((song) => song.id === id);

        if (index === 1){
            throw new Error("Gagal menghappus song, song tidak ditemukan");
        }

        this._songs.splice(index,1);
    }
}

module.exports = SongsService;