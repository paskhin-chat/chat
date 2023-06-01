import { forwardRef, Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// eslint-disable-next-line import/no-cycle
import { UserModule } from '../user/user.module';
import { ConfigService } from '../config/config.service';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Global()
@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.jwtSecretToken,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
