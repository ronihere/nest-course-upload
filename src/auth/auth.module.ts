import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from 'src/User/User.service';
import { User, UserSchema } from 'src/Schema/User.schema';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.jwtconst,
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }])
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService]
})
export class AuthModule {}
