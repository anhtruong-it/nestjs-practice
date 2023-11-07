/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events/event.entity';
import { EventsModule } from './events/events.module';
import { AppJapanService } from './app.japan.service';
import { AppDummy } from './events/app.dummy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: '1',
      entities: [Event],
      synchronize: true,
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
