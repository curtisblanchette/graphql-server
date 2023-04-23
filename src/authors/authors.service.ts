import { Injectable } from '@nestjs/common';
import { Author } from './models/author.model';
import { NewAuthorInput } from './dto/new-author.input';
import { AuthorsArgs } from './dto/authors.args';
import { authors } from './data';


@Injectable()
export class AuthorsService {

    authors: Author[];
    sequence: number;
    constructor() {
        this.authors = authors;
        this.sequence = this.authors.length;
    }

    async create(data: NewAuthorInput): Promise<Author> {
        this.sequence++;
        data['id'] = this.sequence;

        this.authors.push(<Author>data);
        return data as Author;
    }

    async findOneById(id: number): Promise<Author> {
        return this.authors.find((author) => author.id === id);
    }

    async findAll(authorsArgs: AuthorsArgs): Promise<Author[]> {
        return this.authors;
    }

    async remove(id: number): Promise<boolean> {
        this.authors = this.authors.filter(author => author.id !== id);
        return true;
    }
}