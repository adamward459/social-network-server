import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { MailsService } from './mails/mails.service';
import { MailsModule } from './mails/mails.module';

mongoose.set('debug', true);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        SES_REGION: Joi.string().trim().required(),
        SES_ACCESS_KEY_ID: Joi.string().trim().required(),
        SES_SECRET_KEY: Joi.string().trim().required(),
        SES_SENDER_EMAIL: Joi.string().trim().required(),
      }),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/social-network'),
    UsersModule,
    SessionsModule,
    MailsModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailsService],
})
export class AppModule {}
