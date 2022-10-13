import { Field, ID, ObjectType } from '@nestjs/graphql';
import { hasAdminRole } from './field-middlewares/has-admin-role.middleware';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true, middleware: [hasAdminRole] })
  email: string;
}
