import mongoose, { Schema } from "mongoose";
import mongooseAggregate from 'mongoose-aggregate-paginate-v2'

// Middleware "Pre"-->just before "Post"-->just after saving
// mongoose-aggregate as plugin


const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views:{
        type:Number,
        default:0
       },
       isPublished:{
        type:Boolean,
        required:true
       },
       owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
       },
  },
  {
    timestamps: true,
  }
);

//Now we can write aggregated Queries using this
videoSchema.plugin(mongooseAggregate)

export const Video = mongoose.model("Video", videoSchema);
