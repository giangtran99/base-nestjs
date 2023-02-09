import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, Res, StreamableFile, Header } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination(req, file, callback) {
        const path = req.body.path || ""
        callback(null,`${__dirname}/../uploads/${path}`)
      },
      filename(req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        callback(null,`${uniqueSuffix}-${file.originalname}`)
      },
    })
  }))
  @Post('/upload')
  uploadFile(
    @Body() body: CreateFileDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: 'image/png',
      })
      // .addMaxSizeValidator({
      //   maxSize: 10000
      // })
      .build(),
    ) file: Express.Multer.File,
  ) {
    console.log({filed:file},body)
    return {
      body,
      file: file,
    };
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename="package.json"')
  getStaticFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  } 

}
