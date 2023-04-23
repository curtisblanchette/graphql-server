import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthorsService } from '../authors/authors.service';
import { PostsResolver } from './posts.resolver';

@Module({
    providers: [
        PostsResolver,
        PostsService,
        AuthorsService
    ],
})
export class PostsModule{}