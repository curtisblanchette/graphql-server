import { Author } from './models/author.model';
import { Query, Args, Int, Parent, ResolveField, Resolver, Subscription, Mutation } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthorsService } from './authors.service';
import { PostsService } from '../posts/posts.service';

const pubSub = new PubSub();

@Resolver((of) => Author)
export class AuthorsResolver {
    constructor(
        private authorsService: AuthorsService,
        private postsService: PostsService,
    ) {
    }

    @Query(returns => Author)
    async author(@Args('id', {type: () => Int}) id: number) {
        return this.authorsService.findOneById(id)
    }

    @Query(returns => [Author])
    async authors() {
        return this.authorsService.findAll({skip: null, take: null});
    }

    @Mutation(returns => Author)
    async addAuthor(
        @Args('firstName', {type: () => String}) firstName: string,
        @Args('lastName', {type: () => String}) lastName: string
    ) {
        const newAuthor = await this.authorsService.create({firstName, lastName});
        await pubSub.publish('authorAdded', {authorAdded: newAuthor});
        return newAuthor;
    }

    @Mutation(() => Boolean)
    async deleteAuthor(@Args('id', {type: () => Int}) id: number): Promise<boolean> {
        return await this.authorsService.remove(id);
    }

    @ResolveField()
    async posts(@Parent() author: Author) {
        const {id} = author;
        return this.postsService.findAll({authorId: id});
    }

    @Subscription(returns => Author)
    authorAdded() {
        return pubSub.asyncIterator('authorAdded')
    }

}