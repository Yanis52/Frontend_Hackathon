import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export const useExampleQuery = () => {

  return useQuery({
    queryKey: ["characters"],
    queryFn: async () => {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character",
      );
      return response.data.results as Character[];
    },
    refetchOnWindowFocus: false,
  });
};