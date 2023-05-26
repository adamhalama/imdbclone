import React, { useEffect, useMemo, useState } from 'react';
import useNotify from '../notification/use-notify';
import { Movie } from '../../types';
import { instance } from '../../axios.config';
import logger from '../dev/logger';

export type MoviesContextState = {
  movies: Movie[];
  loading: boolean;
  setMovies: (movies: Movie[]) => void
};

const initialMovies: MoviesContextState = {
  movies: [],
  loading: true,
  setMovies: () => {}
};

export const MoviesContext = React.createContext<MoviesContextState>(initialMovies);

type Props = {
  children?: React.ReactNode;
};


const MoviesContainer = ({ children }: Props) => {

  const notify = useNotify();

  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMovies = instance({ 
    url: '/movie',
    method: 'GET'
   })

   const getMovies = async () => {
    fetchMovies
    .then(({ data: resolved }) => {
        const { data, error } = resolved
        if (error) {
            notify(error, 'error')
            return
        }
        setMovies(data ?? [])
    })
    .catch((e) => {
      logger(e)
      notify('An unexpected error occurred', 'error'); 
    })
    
   }
   
  useEffect(() => {
    setLoading(true)
    getMovies()
      .finally(() => setLoading(false))
  }, []);

  

  const context = useMemo<MoviesContextState>(
    () => ({
      movies,
      loading,
      setMovies
    }),
    [loading, movies],
  );
  return <MoviesContext.Provider value={context}>{children}</MoviesContext.Provider>;
};

export default MoviesContainer;
