import { useExampleQuery } from "@/api/react-query-example";

export function ExampleComponent() {
  const { data, isPending, isError, error } = useExampleQuery();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Une erreur est survenue: {error.message}</div>;
  }

  return <div>
    <h1>Characters</h1>
    {data.map((character) => (
      <ul key={character.id}>
        <li>{character.name}</li>
        <li>{character.gender}</li>
      </ul>
    ))}
  </div>;
}