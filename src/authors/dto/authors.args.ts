import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class AuthorsArgs {
    @Field(type => Int, {nullable:  true})
    @Min(0)
    skip = 0;

    @Field(type => Int, {nullable: true})
    @Min(1)
    @Max(50)
    take = 25;
}