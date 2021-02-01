import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    try {
      // CREATE S3 Bucket Once

      // const upload = await new AWS.S3()
      //   .createBucket({
      //     Bucket: 'testishishi123',
      //   })
      //   .promise();

      const objectName = `${Date.now()}-${file.originalName}`;
      const upload = await new AWS.S3()
        .putObject({
          Body: file.buffer,
          Bucket: process.env.BUCKET_NAME,
          Key: objectName,
          ACL: 'public-read',
        })
        .promise();

      const fileUrl = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
      return { url: fileUrl };
    } catch (e) {
      console.log('AWS-error', e);
      return null;
    }
  }
}
