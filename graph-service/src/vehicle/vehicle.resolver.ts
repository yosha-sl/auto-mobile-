import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { AppService } from 'src/app.service';

@Resolver(() => Vehicle)
export class VehicleResolver {

  

  constructor(
    private readonly vehicleService: VehicleService,
    private readonly appService:AppService
    ) {}

  @Mutation(() => Vehicle)
  createVehicle(@Args('createVehicleInput') createVehicleInput: CreateVehicleInput) {
    return this.vehicleService.create(createVehicleInput);
  }

  @Query(() => [Vehicle], { name: 'vehicles' })
  findAll() {
    return this.vehicleService.findAll();
  }

  @Query(() => Vehicle, { name: 'vehicle' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.vehicleService.findOne(id);
  }

  @Mutation(() => Vehicle)
  updateVehicle(@Args('updateVehicleInput') updateVehicleInput: UpdateVehicleInput) {
    return this.vehicleService.update(updateVehicleInput.id, updateVehicleInput);
  }

  @Mutation(() => Vehicle)
  removeVehicle(@Args('id', { type: () => Int }) id: number) {
    return this.vehicleService.remove(id);
  }

  @Query(() => [Vehicle], { name: 'download' })
  toDownload() {
    console.log('Calling');
    this.vehicleService.findAll().then( res => {
      this.appService.getHello(res);
    });
    return [];
  }
}
