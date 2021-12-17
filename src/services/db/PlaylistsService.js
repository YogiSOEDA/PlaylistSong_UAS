const {Pool} = require('pg');
const {nanoid} = require("nanoid");

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async addPlaylist({name}) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: `INSERT INTO playlists VALUES($1,$2,$3,$4) RETURNING id`,
            values: [id,name,createdAt,updatedAt]
        }

        const result = await this._pool.query(query);

        if (!result.rows[0].id){
            throw new Error('Playlist gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getPlaylists(){
        const result = await this._pool.query(`SELECT*FROM playlists`);
        return result.rows;
    }

    async getPlaylistById(id){
        const query = {
            text: 'SELECT * FROM playlists WHERE id=$1',
            values: [id]
        }

        const result = await this._pool.query(query);
        if (!result.rows.length){
            throw new Error('Playlist tidak ditemukan');
        }
        return result.rows[0];
    }

    async addSongToPlaylist(id,{song_id}){
        const ps_id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: `INSERT INTO playlist_songs VALUES($1,$2,$3,$4,$5) RETURNING id`,
            values: [ps_id,id,song_id,createdAt,updatedAt]
        }

        const result = await this._pool.query(query);

        if (!result.rows[0].id){
            throw new Error('Lagu gagal ditambahkan dalam playlist');
        }

        return result.rows[0].id;
    }

    async getSongInPlaylist(id){
        const query = {
            text: `SELECT playlists.name, songs.title FROM playlist_songs 
                    INNER JOIN playlists
                        ON playlist_songs.playlist_id=playlists.id
                    INNER JOIN songs
                        ON playlist_songs.song_id=songs.id
                    WHERE playlist_songs.playlist_id=$1`,
            values: [id]
        }

        const result = await this._pool.query(query);
        if (!result.rows.length){
            throw new Error('Playlist tidak ditemukan,dan Lagu tidak ditemukan');
        }
        return result.rows;
    }
}

module.exports = PlaylistsService;