const mongoose = require('mongoose');

const GridFsFilesSchema = mongoose.Schema(
    {
        filename: {
            type: String
        }, 
        id: {
            type: String
        },
        contentType: {
            type: String
        }
    }
)


module.exports = mongoose.model('GridFsFiles', GridFsFilesSchema);