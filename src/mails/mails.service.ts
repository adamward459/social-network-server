import {
  CloneReceiptRuleSetCommand,
  SendEmailCommand,
  SESClient,
} from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailsService {
  client: SESClient;

  constructor(private readonly configService: ConfigService) {
    this.client = new SESClient({
      region: this.configService.get('SES_REGION'),
      credentials: {
        accessKeyId: this.configService.get('SES_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get('SES_SECRET_KEY')!,
      },
    });
  }

  send() {
    const sendCommand = new SendEmailCommand({
      Destination: {
        ToAddresses: [],
      },
      Source: this.configService.get('SES_SENDER_EMAIL'),
      Message: {
        Subject: {
          Data: '',
        },
        Body: {
          Text: {
            Data: '',
          },
        },
      },
    });

    return this.client.send(sendCommand);
  }
}
