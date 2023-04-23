import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class NewPostInput {

    @Field({nullable: false})
    title: string;

    @Field({nullable: true})
    @MaxLength(255)
    content: string;

    @Field(() => Int!)
    @IsOptional()
    votes: number;

    @Field(() => Int)
    authorId: number;
}