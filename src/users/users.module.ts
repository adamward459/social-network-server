import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { MailsModule } from '../mails/mails.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, userSchema } from './schemas/user.schema';

@Module({
  imports: [
    JwtModule.register({}),
    MailsModule,
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
