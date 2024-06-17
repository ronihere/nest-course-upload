import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import UserModule from './User/User.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ClodinaryService } from './clodinary/clodinary.service';

@Module({
  imports: [CloudinaryModule,UserModule,JwtModule,AuthModule, ConfigModule.forRoot({
    envFilePath: '.env',
  }),MongooseModule.forRoot(process.env.mongostring), CourseModule, CloudinaryModule],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },AppService, ClodinaryService],
})
export class AppModule {}
