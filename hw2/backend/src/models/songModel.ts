import type { SongData } from "@lib/shared_types";
import mongoose from "mongoose";
import type { Types } from "mongoose";

// In `SongData`, we have `list_id` and `id` as a string, but in the database, we want to store them as an ObjectId.
// Document = MongoDB裡的單筆資料
// 這裡的定義是為了確保js物件有被轉成mongoDB的儲存形式
interface SongDocument
  extends Omit<SongData, "id" | "list_id">, // id本來就是在mongoDB裡新增資料時產生的，不用再傳進去，所以要omit
    mongoose.Document {
  // 確保在js裡type為string的list_id有被轉成mongoDB裡的objectId
  list_id: Types.ObjectId;
}

// 確保DB裡透過SongModel進行CRUD的資料型別都是SongDocument
interface SongModel extends mongoose.Model<SongDocument> {}

// We enforce the type by adding `<SongDocument>` after `mongoose.Schema`.
const SongSchema = new mongoose.Schema<SongDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    singer: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    list_id: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: 指向另一個schema，之後可以populate取得該資料庫的資料
      // The ref option is what tells Mongoose which model to use during population, in our case the Song model. All _ids we store here must be document _ids from the Song model.
      ref: "List",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret): void => {
        // 在DB裡都是ObjectId
        ret.id = ret._id.toString();
        ret.list_id = ret.list_id.toString();
        delete ret._id;
        delete ret.__v; // 也可以在schema加入versionKey: false
      },
    },
  },
);

const Song = mongoose.model<SongDocument, SongModel>("Song", SongSchema);
export default Song;
