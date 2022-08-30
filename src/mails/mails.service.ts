import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type SendMailPayload = {
  toAddress: string;
  subject: string;
  text: string;
};

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

  send(payload: SendMailPayload) {
    const sendCommand = new SendEmailCommand({
      Destination: {
        ToAddresses: [payload.toAddress],
      },
      Source: this.configService.get('SES_SENDER_EMAIL'),
      Message: {
        Subject: {
          Data: payload.subject,
        },
        Body: {
          Text: {
            Data: payload.text,
          },
        },
      },
    });

    return this.client.send(sendCommand);
  }
}
