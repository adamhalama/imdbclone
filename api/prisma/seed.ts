import client from "../src/repository/client/client"
import log from '../src/logging/log'

const getActorCreate = (names: string[]) => ({ create: names.map(name => ({ name })) })

const createMovies = async () => {
    await client.$transaction([
        client.movie.create({ data: 
            {
                id: 1375666,
                name: "Inception",
                description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
                director: "Christopher Nolan",
                genre: "Sci-Fi",
                year: 2000,
                actors: getActorCreate(["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"]),
            },
            
        }),
        client.movie.create({ data: 
            {
                id: 1285016,
                name: "The Social Network",
                description: "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea and by the co-founder who was later squeezed out of the business.",
                director: "David Fincher",
                genre: "Biography",
                year: 2010,
                actors: getActorCreate(["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake"]) 
            },
        }),
        client.movie.create({ data: 
            {
                id: 167261,
                name: "The Lord of the Rings: Two Towers",
                description: "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
                director: "Peter Jackson",
                genre: "Adventure",
                year: 2002,
                actors: getActorCreate(["Elijah Wood", "Ian McKellen", "Viggo Mortensen"]) 
            },
        }),
        client.movie.create({ data: 
            {
                id: 120737,
                name: "The Lord of the Rings: The Fellowship of the Ring",
                description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
                director: "Peter Jackson",
                genre: "Adventure",
                year: 2001,
                actors: getActorCreate(["Elijah Wood", "Ian McKellen", "Orlando Bloom"]) 
            },
        }), 
        client.movie.create({ data: 
            {
                id: 133093,
                name: "The Matrix",
                description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
                director: "Lana Wachowski",
                genre: "Adventure",
                year: 1999,
                actors: getActorCreate(["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]) 
            },
        }), 
        client.movie.create({ data: 
            {
                id: 110912,
                name: "Pulp Fiction",
                description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
                director: "Quentin Tarantino",
                genre: "Crime",
                year: 1994,
                actors: getActorCreate(["John Travolta", "Uma Thurman", "Samuel L. Jackson"]) 
            },
        }), 
        client.movie.create({ data: 
            {
                id: 86250,
                name: "Scarface",
                description: "In 1980 Miami, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.",
                director: "Brian De Palma",
                genre: "Crime",
                year: 1983,
                actors: getActorCreate(["Al Pacino", "Michel Pfeiffer", "Steven Bauer"]) 
            },
        }), 
        client.movie.create({ data: 
            {
                id: 82971,
                name: "Raiders of the Lost Ark",
                description: "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before the Nazis can obtain its awesome powers.",
                director: "Steven Spielberg",
                genre: "Adventure",
                year: 1981,
                actors: getActorCreate(["Harrison Ford", "Karen Allen", "Paul Freeman"]) 
            },
        }), 
        client.movie.create({ data: 
            {
                id: 68646,
                name: "The Godfather",
                description: "Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
                director: "Francis Ford Coppola",
                genre: "Drama",
                year: 1972,
                actors: getActorCreate(["Al Pacino", "Marlon Brando", "James Caan"]) 
            },
        }), 
        client.movie.create({ data: 
            {
                id: 78748,
                name: "Alien",
                description: "The crew of a commercial spacecraft encounter a deadly lifeform after investigating an unknown transmission.",
                director: "Ridley Scott",
                genre: "Horror",
                year: 1979,
                actors: getActorCreate(["Sigourney Weaver", "Tom Skerritt", "John Hurt"]) 
            },
        }),
    ])

}


const seed = async () => {
    try {
        await createMovies()
    } catch (e) {
        log(e, 'error')
    } finally {
        await client.$disconnect()
    }
}

seed()

