import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class PostsArgs {
    @Field(type => Int)
    @IsOptional()
    authorId?: number;
}