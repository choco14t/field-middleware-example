import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user.type';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  user() {
    return {
      id: '1',
      name: 'user 1',
      email: 'user_1@example.com',
    };
  }
}
