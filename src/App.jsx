import { useQuery, gql } from "@apollo/client";
import "./App.css";

const GET_MOVIES = gql`
  query Movies {
    movies(first: 10) {
      id
      federateMovie {
        data {
          Title
          Poster
          Genre
          Director
        }
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="movies-container">
      {data.movies.map(({ federateMovie: { data: movieData }, id }) => (
        <div key={id} className="movie-card">
          <h3>{movieData.Title}</h3>
          <img src={movieData.Poster} alt={movieData.Title} />
          <p>Genre: {movieData.Genre}</p>
          <p>Director: {movieData.Director}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
