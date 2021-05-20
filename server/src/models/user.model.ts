import { Model, model, Schema, Types, Document } from 'mongoose';
import UniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';

export interface IUser {
  dateOfBirth: Date;
  email: string;
  gender: string;
  isActive: boolean;
  jobTitle: string;
  manager: string;
  nameGiven: string;
  nameMiddle?: string;
  nameFamily: string;
  password?: string;
  picture: string;
  roles: string[];
}

export interface UserDocument extends IUser, Document {
  _id: string;
  id: string;
  fullName: string;
  isValidPassword([password]: string): boolean;
  changePassword([oldPassword]: string, [newPassword]: string): boolean;
}

const UserSchema = new Schema<UserDocument>(
  {
    dateOfBirth: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    nameGiven: {
      type: String,
      required: true,
    },
    nameMiddle: String,
    nameFamily: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      default: ['user'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// @ts-ignore
UserSchema.plugin(UniqueValidator);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const hashSalt = await bcrypt.hash(this.password, 10);
      this.password = hashSalt;
    } catch (error) {
      next(error);
    }
  }
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase().trim();
  }
  if (this.isModified('dateOfBirth')) {
    this.dateOfBirth = new Date(this.dateOfBirth);
  }
});

UserSchema.virtual('fullName').get(function (this: UserDocument) {
  let fullName = '';
  if (this.nameGiven) {
    fullName += this.nameGiven;
  }
  if (this.nameMiddle) {
    fullName += ` ${this.nameMiddle}`;
  }
  if (this.nameFamily) {
    fullName += ` ${this.nameFamily}`;
  }
  return fullName;
});

UserSchema.methods.isValidPassword = async function (password: string) {
  try {
    if (!this.password) return false;
    const authenticated = await bcrypt.compare(password, this.password);
    return authenticated;
  } catch (error) {
    return new Error(error);
  }
};

UserSchema.methods.changePassword = async function (
  oldPassword: string,
  newPassword: string
) {
  try {
    if (!this.password) return false;
    const authenticated = await bcrypt.compare(oldPassword, this.password);
    if (!authenticated) {
      return false;
    }
    this.password = newPassword;
    return true;
  } catch (error) {
    return new Error(error);
  }
};

UserSchema.method('toJSON', function () {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
});

export default model<UserDocument>('User', UserSchema);
