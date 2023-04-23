import { Module } from '@nestjs/common';
import { AuthorsResolver } from './authors.resolver';
import { PostsService } from '../posts/posts.service';
import { AuthorsService } from './authors.service';

@Module({
    providers: [
        AuthorsResolver,
        AuthorsService,
        PostsService
    ],
})
export class AuthorsModule{}