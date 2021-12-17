class SongsHandler {
    constructor(service,validator) {
        this._service = service;
        this._validator = validator;

        this.addSongHandler = this.addSongHandler.bind(this);
        this.getAllSongsHandler = this.getAllSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.editSongByIdHandler = this.editSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }

    async addSongHandler(request,h){
        try{
            this._validator.validateSongPayload(request.payload);

            const {title, year, artist, gendre, duration} = request.payload;
            const songId = await this._service.addSong({title, year, artist, gendre, duration});

            const response = h.response({
                status: 'success',
                message: 'Song berhasil disimpan',
                data: {
                    songId : songId
                }
            })
            response.code(201);
            return response;
        }catch (e) {
            const response = h.response({
                status: 'fail',
                message: e.message
            })
            response.code(400);
            return response;
        }
    }

    async getAllSongsHandler(){
        const songs = await this._service.getSongs();
        return {
            status: 'success',
            data: {
                songs
            }
        }
    }

    async getSongByIdHandler(request,h){
        try {
            const {id} = request.params;
            const song = await this._service.getSongById(id);
            return {
                status: 'success',
                data: {
                    song
                }
            }
        }catch (e) {
            const response = h.response({
                status: 'fail',
                message: e.message
            })
            response.code(404);
            return response;
        }
    }

    async editSongByIdHandler(request,h){
        try {
            this._validator.validateSongPayload(request.payload);

            const {id} = request.params;
            const {title, year, artist, gendre, duration} = request.payload;
            await this._service.editSongById(id, {title, year, artist, gendre, duration});
            return {
                status: 'success',
                message: 'Song berhasil diperbaharui'
            }
        }catch (e) {
            const response = h.response({
                status: 'fail',
                message: e.message
            })
            response.code(404);
            return response;
        }
    }

    async deleteSongByIdHandler(request,h){
        try {
            const {id} = request.params;
            await this._service.deleteSongById(id);
            return {
                status: 'success',
                message: 'Song berhasil dihapus'
            }
        }catch (e) {
            const response = h.response({
                status: 'fail',
                message: e.message
            })
            response.code(404);
            return response;
        }
    }
}

module.exports = SongsHandler;