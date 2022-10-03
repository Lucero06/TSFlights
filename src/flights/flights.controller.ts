import { Controller, Get, Param, Post, Body, Put, Delete, Patch } from '@nestjs/common';
import { FlightService } from './flights.service';
import { Flights } from './flights.entity';
import {Flight} from './flight.model';
import { identity } from 'rxjs';

@Controller('flights')
export class FlightsController {
    constructor (private readonly flightService:FlightService){}

    @Get("cities/origins")
    getOrigins():Promise<String[]>{
        return this.flightService.getFlightOrigins();
    }

    @Get("cities/destinations")
    getDestinations():Promise<String[]>{
        return this.flightService.getFlightDestinations();
    }

    @Get()
    findAll():Promise<Flights[]>{
        return this.flightService.findAll();
    }

    @Get("/:id")
    async findOne(@Param() param): Promise<Flights[]>{
        return this.flightService.findOne(param.id);
    }

    @Get("query/:orig/:dest")
    async query(@Param('orig') orig, @Param('dest') dest): Promise<any>{
        return this.flightService.query(orig,dest);
    }

    @Post()
    async create(@Body() flight: Flight):Promise<Flights[]>{
        return this.flightService.create(flight);
    }

    @Patch(":id")
    async update(@Param('id') id, @Body() flight:Flight): Promise<any>{
        flight.id=Number(id);
        return this.flightService.update(flight);
    }

    @Delete(":id")
    async delete(@Param('id') id): Promise<any>{
        return this.flightService.delete(id);
    }

}
