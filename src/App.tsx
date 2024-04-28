import { useState, useEffect } from "react";

interface Repo {
  name: string;
  description: string;
}

function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://api.github.com/users/cerqueirabruno/repos')
      .then(response => response.json())
      .then(data => setRepos(data))
  }, []);

  console.log(repos);

  return (
    <>
      <input
        name="search"
        type="text"
        placeholder="Buscar..."
        onChange={e => setSearch(e.target.value)}
        value={search}
      />

      <ul>
        {repos
          .filter(repo => repo.name.includes(search))
          .map(repo => (
            <li key={repo.name}>
              <strong>{repo.name}</strong>
              <p>{repo.description}</p>
            </li>
          ))
        }
      </ul>
    </>
  );
}

export default App;