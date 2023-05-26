export type Friend = {
    username: string
    toplist: Movie[]
}

export type Movie = {
    id: number
    name: string
    description: string
    director: string
    image: string
    genre: string
    year: number
    actors: string[],
    ratings: number[],
    comments: Comment[]
}

export type Comment = {
    username: string, 
    date: string, 
    text: string
}