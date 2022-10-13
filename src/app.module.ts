import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';

export enum ViewerRole {
  MEMBER,
  ADMIN,
}

export interface Viewer {
  userName: string;
  role: ViewerRole;
}

export interface AppContext {
  viewer: Viewer | undefined;
}

const users: Viewer[] = [
  { userName: 'user_1', role: ViewerRole.MEMBER },
  { userName: 'user_2', role: ViewerRole.ADMIN },
];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }): AppContext => {
        const token = req.headers.authorization || '';
        const viewer = users.find((user) => user.userName === token);

        return { viewer };
      },
    }),
    UserModule,
  ],
})
export class AppModule {}
