import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MailsModule } from '../mails/mails.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, userSchema } from './schemas/user.schema';

@Module({
  imports: [
    MailsModule,
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
