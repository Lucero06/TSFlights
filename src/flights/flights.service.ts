import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { Flights } from "./flights.entity";
import { Flight } from "./flight.model";

@Injectable()
export class FlightService{
    constructor(
        @InjectRepository(Flights)
        private readonly flightRepository: Repository<Flights>,
    ){}


    async getFlightOrigins():Promise<String[]>{
        return this.flightRepository.query(
            "Select DISTINCT origin from flights"
        );
    }

    async getFlightDestinations(): Promise<String[]>{
        return this.flightRepository.query(
            "Select DISTINCT destination from flights"
        );
    }

    async findAll(): Promise<Flights[]>{
        return this.flightRepository.find();
    }

    async findOne(id: number): Promise<any>{
        return this.flightRepository.findOneBy({id});
    }

    async query(orig:string, dest:string): Promise<any>{
        return await this.flightRepository.find(
            {
                where:{
                    origin:orig, destination:dest
                }
            }
        );
    }

    async create(flight: Flight): Promise<any>{
        return await this.flightRepository.save(flight);
    }

    async update(flight:Flight):Promise<UpdateResult>{
        return await this.flightRepository.update(
            flight.id, flight
        );
    }

    async delete(id: number): Promise<any> {
        return this.flightRepository.delete(id);
      }

}