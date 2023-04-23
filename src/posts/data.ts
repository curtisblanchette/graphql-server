import { Post } from './models/post.model';

export let posts: Post[] = [
    {
        id: 1,
        title: 'A day to remember',
        content: 'There once was a day, it was a day of joy. It was a day to remember. The end.',
        authorId: 1,
        votes: 3
    },
    {
        id: 2,
        title: 'A day to forget',
        content: 'There once was a day, it was a day of sadness. It was a day to remember. The end.',
        authorId: 1,
        votes: 1
    },
    {
        id: 3,
        title: 'A day to celebrate',
        content: 'There once was a day, it was a day of amazing talent and dedication. It was a day to celebrate. The end.',
        authorId: 2,
        votes: 5
    }
]