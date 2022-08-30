import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  BadRequestException,
  Logger,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestUserRegistrationDto } from './dto/request-user-registration.dto';
import { JwtService } from '@nestjs/jwt';
import constants from '../constants';
import { MailsService } from '../mails/mails.service';

@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailsService: MailsService,
  ) {}

  @Post('request-registration')
  @Version('1')
  async requestRegistration(@Body() body: RequestUserRegistrationDto) {
    const user = await this.usersService.findOneByUsername(
      body.username.toLowerCase(),
    );
    if (user) {
      throw new BadRequestException('Username is not available');
    }

    const token = this.jwtService.sign(
      { username: body.username },
      { secret: constants.REGISTRATION_SECRET },
    );

    this.mailsService
      .send({ toAddress: 'adamward459@gmail.com', subject: 'a', text: '11' })
      .catch((err) => {
        this.logger.error(err.message);
      });
    return {
      token,
    };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
