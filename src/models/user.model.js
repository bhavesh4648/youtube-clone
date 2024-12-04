import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY;
const refereshTokenSecret = process.env.REFERESH_TOKEN_SECRET;
const refereshTokenExpiry = process.env.REFERESH_TOKEN_EXPIRY;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      require: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      require: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [{ type: Schema.Types.ObjectIds, ref: "Vedio" }],
    password: {
      typea: String,
      require: [true, "Password is required"],
    },
    refereshToken: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrected = async function (password) {
  return await bcrypt.compare(this.password, password);
};

userSchema.methods.generateAccessToken = async () => {
  jwt.sign(
    {
      __id: this._id,
      email: this.email,
      name: this.name,
      fullName: this.fullName,
    },
    accessTokenSecret,
    { expiresIn: accessTokenExpiry }
  );
};

userSchema.methods.generateRefereshToken = async () => {
  jwt.sign({ _id: this._id }, refereshTokenSecret, {
    expiresIn: refereshTokenExpiry,
  });
};

export const user = mongoose.model("user", userSchema);
