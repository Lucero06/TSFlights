import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsController } from './flights/flights.controller';
import { Flights } from './flights/flights.entity';
import { FlightsModule } from './flights/flights.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'',
      database:'transportation',
      entities:[Flights],
      synchronize:true,
    }),
    FlightsModule
  ],

})
export class AppModule {}
