import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthorsModule } from './authors/authors.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
      AuthorsModule,
      PostsModule,
      GraphQLModule.forRoot<ApolloDriverConfig>({
        /**
         * Alternatively, the schema can be generated on-the-fly in memory.
         * To enable this, set the autoSchemaFile property to true:
         */
        autoSchemaFile: true,
        /**
         * Multiple endpoints:
         * A useful feature of the @nestjs/graphql module is the ability to serve multiple endpoints at once.
         * This lets you decide which modules should be included in which endpoint.
         * By default, GraphQL searches for resolvers throughout the whole app.
         * To limit this scan to only a subset of modules, use the include property.
         * include: [CatsModule],
         */

        /**
         * To use the code first approach, start by adding the autoSchemaFile property to the options object:
         * The autoSchemaFile property value is the path where your automatically generated schema will be created.
         * autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
         */

        // definitions: {
        //   path: join(process.cwd(), 'src/graphql.ts'),
        //   outputAs: 'class'
        // },

        driver: ApolloDriver,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        subscriptions: {
            'graphql-ws': true
        },

          /**
         * To use the schema first approach, start by adding a typePaths property to the options object.
         * The typePaths property indicates where the GraphQLModule should look for GraphQL SDL schema definition files you'll be writing.
         * These files will be combined in memory;
         * this allows you to split your schemas into several files and locate them near their resolvers.
         */
        // typePaths: ['./**/*.graphql']
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
