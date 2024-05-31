
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getMedalFranceYears = () => {
    return useQuery<any[], Error>({
        queryKey: ['medals_by_year_france'],
        queryFn: async () => {
            const response = await axios.get('https://backend-hackathon-test2.vercel.app/medals_by_year_france');
            return response.data;
        },
        refetchOnWindowFocus: false,
        placeholderData: [],
    });
};