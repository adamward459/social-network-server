import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ unique: true, index: true })
  username: string;

  @Prop()
  password: string;
}

export type UserDocument = Document & User;

export const userSchema = SchemaFactory.createForClass(User);
