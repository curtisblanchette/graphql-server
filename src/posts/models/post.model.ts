import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Author } from '../../authors/models/author.model';
import { IsOptional } from 'class-validator';

@ObjectType()
export class Post {
    @Field(type => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field(type => Int, { nullable: true})
    votes?: number;

    @Field(() => Int)
    authorId: number;

    @Field(() => Author)
    @IsOptional()
    author?: Author;
}