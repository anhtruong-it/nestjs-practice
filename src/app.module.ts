/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventsModule } from './events/events.module';
import { AppJapanService } from './app.japan.service';
import { AppDummy } from './events/app.dummy';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './events/config/orm.config';
import ormConfigProd from './events/config/orm.config.prod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd
    }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [{
    provide: AppService,
    useClass: AppJapanService,
  }, {
    provide: 'APP_NAME',
    useValue: 'Nest Events',
  }, {
    provide: 'MESSAGE',
    inject: [AppDummy],
    useFactory: (app) => `${app.dummy()} fdfsd!`,
  }, AppDummy],
})
export class AppModule {}
