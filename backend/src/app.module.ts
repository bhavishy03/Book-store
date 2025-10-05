import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { NavigationModule } from './navigation/navigation.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AppController } from './app.controller';
import { DevModule } from './dev/dev.module'; // ensure this file exists

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get<string>('MONGO_URI') || '',
      }),
    }),
    NavigationModule,
    CategoryModule,
    ProductModule,
    DevModule, // add dev module here
  ],
  controllers: [AppController],
})
export class AppModule {}