import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { MongooseConfigService } from './config/MongooseConfigService';
import configuration from './config/configuration';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CostsModule } from './costs/costs.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UserModule,
    AuthModule,
    CostsModule,
  ],
})
export class AppModule {}
