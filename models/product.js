import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { APP_URL } from '../config';

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        image: {
            type: String,
            required: true,
            // --> we are doing this so all imagePath stored in the database get domain in the beginning.
            get: (image) => {
                // http://localhost:5000/uploads/1616443169266-52350494.png
                if (process.env.ON_HEROKU == 'true') {
                    return `${image}`;
                }
                return `${APP_URL}/${image}`;
            },
        },
    },
    // { getters: true} --> make getters accept this.
    { timestamps: true, toJSON: { getters: true }, id: false }  //--> we are making id equal to false so we don't get id while reading 
);

export default mongoose.model('Product', productSchema, 'products');
