import mongoose from "mongoose";

// Schema: 資料的規格
// Model: 負責將規格套上每筆資料及處理CRUD (可使用find, delete, create等methods)

const diarySchema = new mongoose.Schema(
  {
    // // 有timestamps: true就會自動產生createdAt and updatedAt
    // createdAt: {
    //   type: Date,
    //   required: true,
    //   default: () => Date.now(), // 每次插入新日記就執行
    //   immutable: true // 之後不可變動
    // },
    // updatedAt: {
    //   type: Date,
    //   required: true,
    //   default: () => Date.now(), // 每次插入新日記就執行
    // },
    content: {
      type: String
    },
    tags: {
      type: [String] // array of string
    },
    moods: {
      type: [String] // array of string
    }
  },

  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret.__id.toString();
        delete ret.__id;
        delete ret.__v;
      },
    },

    timestamps: true,
  }
);

// // 每次save前都執行function: 更新updatedAt屬性為當下時間
// diarySchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// Default collection name: Diary -> diarys
// schema used: diarySchema
const DiaryModel = mongoose.model("Diary", diarySchema);

export default DiaryModel;