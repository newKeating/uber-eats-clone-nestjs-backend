import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/resaurant.entity';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  @Query((returns) => [Restaurant])
  restaurants(
    @Args('veganOnly', { nullable: true }) veganOnly: boolean,
  ): Restaurant[] {
    return [];
  }

  @Mutation((returns) => Boolean)
  createRestaurant(@Args() createRestaurantDto: CreateRestaurantDto): boolean {
    return true;
  }
}
