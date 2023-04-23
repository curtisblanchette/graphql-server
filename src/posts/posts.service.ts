import { Injectable } from '@nestjs/common';
import { NewPostInput } from './dto/new-post.input';
import { Post } from './models/post.model';
import { PostsArgs } from './dto/posts.args';
import { posts } from './data';

@Injectable()
export class PostsService {
    sequence: number;
    posts: Post[];

    constructor(){
        this.sequence = posts.length;
        this.posts = posts;
    }

    async create(data: NewPostInput): Promise<Post> {
        this.sequence++;
        data['id'] = this.sequence;

        posts.push(<Post>data);
        return data as Post;
    }

    async findOneById(id: number): Promise<Post> {
        return posts.find((post) => post.id === id);
    }

    async findAll(postsArgs: PostsArgs = {}): Promise<Post[]> {
        return this.posts.filter(post => post.authorId === postsArgs.authorId);
    }

    async upVote(id: number): Promise<boolean> {
        const post = await this.findOneById(id);
        post.votes += 1;

        return true;
    }

    async remove(id: number): Promise<boolean> {
        // @ts-ignore
        posts = posts.filter(post => post.id !== id);
        return true;
    }
}