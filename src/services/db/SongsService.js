const {Pool} = require('pg');
const {nanoid} = require("nanoid");

class SongsService {
    constructor() {
        this._pool = new Pool();
    }

    async addSong({title, year, artist, gendre, duration}) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: `INSERT INTO songs VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
            values: [id, title,year,artist,gendre,duration,createdAt,updatedAt]
        }

        const result = await this._pool.query(query);

        if (!result.rows[0].id){
            throw new Error('Song gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getSongs(){
        const result = await this._pool.query(`SELECT*FROM songs`);
        return result.rows;
    }

    async getSongById(id){
        const query = {
            text: 'SELECT * FROM songs WHERE id=$1',
            values: [id]
        }

        const result = await this._pool.query(query);
        if (!result.rows.length){
            throw new Error('Song tidak ditemukan');
        }
        return result.rows[0];
    }

    async editSongById(id,{title, year, artist, gendre, duration}){
        const updated_At = new Date().toISOString();
        const query = {
            text: `UPDATE songs SET title=$1,year=$2,artist=$3,gendre=$4,duration=$5,updated_at=$6 WHERE id=$7 RETURNING id`,
            values: [title,year,artist,gendre,duration,updated_At,id]
        }
        const result = await this._pool.query(query);
        if (!result.rows.length){
            throw new Error('Gagal memperbaharui song, Song tidak ditemukan');
        }

    }

    async deleteSongById(id){
        const query = {
            text: `DELETE FROM songs WHERE id=$1 RETURNING id`,
            values: [id]
        }
        const result = await this._pool.query(query);
        if (!result.rows.length){
            throw new Error('Gagal menghapus song, Song tidak ditemukan');
        }
    }
}

module.exports = SongsService;