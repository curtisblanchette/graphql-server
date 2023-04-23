import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../../posts/models/post.model';

@ObjectType({ description: 'Author Model' })
export class Author {
    /**
     * Type function is required where there's a potential for ambiguity between Typescript Types and GraphQL types
     * Not required for string and boolean types. but is for number types (which must be mapped to Int or Float GraphQL types)
     */
    @Field(type => Int)
    id?: number;

    /**
     * Field Options are:
     * nullable: for specifying whether a field is nullable
     * description: for setting a field description; string
     * deprecationReason: for marking a field as deprecated; string
     */
    @Field({nullable: true})
    firstName?: string;

    @Field({nullable: true})
    lastName?: string;

    /**
     * When the field is an array, we must manually indicate the array type in the Field() decorator's type function
     * as shown below:
     */
    @Field(type => [Post!]!)
    posts?: Post[]
}