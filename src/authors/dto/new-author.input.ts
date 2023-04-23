import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';
import { Post } from '../../posts/models/post.model';

@InputType({description: 'Create Author DTO'})
export class NewAuthorInput {

    @Field()
    @MaxLength(30)
    firstName: string;

    @Field()
    @MaxLength(30)
    lastName: string;

    // An author can be created with Posts
    @Field(type => [Post!]!)
    @IsOptional()
    posts?: Post[];
}