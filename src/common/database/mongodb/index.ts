import { ArticleModel } from "@/api/article/article.model";
import { UserModel } from "@/api/user/user.model";
import { env } from "@/common/utils/envConfig";
import { hashString } from "@/common/utils/hash";
import { plainLogger } from "@/common/utils/logger";
import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    plainLogger.info("MongoDB connected");
  } catch (error) {
    plainLogger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export async function seedMongo() {
  connectMongo();

  const user = await UserModel.create({
    name: "myskill",
    username: "myskill",
    password: hashString("12345678"),
  });

  console.log("User seeded");
  await ArticleModel.insertMany([
    {
      title: "Indonesia menjadi negara maju",
      content:
        "Indonesia, merupakan sebuah negara dengan jumlah penduduk yang cukup besar.",
      status: "draft",
      user: user,
    },
    {
      title: "Indonesia menjadi raksasa",
      content:
        "Indonesia, merupakan sebuah negara dengan jumlah penduduk yang cukup besar.",
      status: "published",
      user: user,
    },
  ]);

  await mongoose.disconnect();
}
