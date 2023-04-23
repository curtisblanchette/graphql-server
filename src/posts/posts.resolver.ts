import { Author } from '../authors/models/author.model';
import { Query, Args, Int, Parent, ResolveField, Resolver, Subscription, Mutation } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthorsService } from '../authors/authors.service';
import { PostsService } from './posts.service';
import { Post } from './models/post.model';

const pubSub = new PubSub();

@Resolver((of) => Post)
export class PostsResolver {
    constructor(
        private authorsService: AuthorsService,
        private postsService: PostsService,
    ) {
    }

    @Query(returns => Post)
    async queryPosts(@Args('id', { type: () => Int }) id: number) {
        return this.postsService.findOneById(id)
    }

    @Query(returns => [Post])
    async posts() {
        return this.postsService.findAll();
    }

    @Mutation(returns => Post)
    async addPost(
        @Args('title', { type: () => String }) title: string,
        @Args('content', { type: () => String }) content: string,
        @Args('votes', { type: () => Int }) votes: number,
        @Args('authorId', { type: () => Int }) authorId: number
    ) {
        const newPost = await this.postsService.create({ title, content, votes, authorId });
        await pubSub.publish('postAdded', { postAdded: newPost });
        return newPost;
    }

    @Mutation(returns => Boolean)
    async upVotePost(@Args('id', {type: () => Int}) postId: number): Promise<boolean> {
        return this.postsService.upVote(postId);
    }

    @ResolveField()
    async author(@Parent() post: Post): Promise<Author> {
        const { author } = post;
        return this.authorsService.findOneById(author.id);
    }

    @Subscription(returns => Post)
    postAdded() {
        return pubSub.asyncIterator('postAdded')
    }

}