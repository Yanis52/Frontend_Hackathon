import { Athlete } from "@/type/athelete";
import { Country, CountryDetails, Host } from "@/type/host";
import { CountryMedal, YearlyMedalCount } from "@/type/year-medal-count";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getHost = (start: number, end: number) => {
    return useQuery({
        queryKey: ["hosts", start, end],
        queryFn: async () => {
            const response = await axios.get(
                `https://backend-hackathon-test2.vercel.app/host?_start=${start}&_end=${end}`
            );
            return response.data as Host[];
        },
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
};
export const getAthletes = (start: number, end: number) => {
    return useQuery({
        queryKey: ["athletes", start, end],
        queryFn: async () => {
            const response = await axios.get(
                `https://backend-hackathon-test2.vercel.app/athlete?_start=${start}&_end=${end}`
            );
            return response.data as Athlete[];
        },
        //   refetchOnWindowFocus: false,
        //   placeholderData: keepPreviousData,
    });
};
type AthleteData = {
    Athlete_ID: number;
    Athlete: string;
    Country: string;
    Medal_Count: string;
    Discipline: string,
    Game: string,
    Highest_Medal: string,
    Event_Name: string
};

export const getOneAthlete = (fullName: string) => {
    return useQuery({
        queryKey: ["athlete-", fullName],
        queryFn: async () => {
            const response = await axios.get(
                `https://backend-hackathon-test2.vercel.app/athlete/${fullName}`
            );
            return response.data as AthleteData;
        },
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
}

export const getMedalCountry = () => {
    return useQuery({
        queryKey: ["medalCountry"],
        queryFn: async () => {
            const response = await axios.get(
                `https://backend-hackathon-test2.vercel.app/top_10_countries_medals`
            );
            return response.data as CountryMedal[];
        },
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
}


export const getBestAndWorstYearFrance = () => {
    return useQuery({
        queryKey: ["bestAndWorstYearFrance"],
        queryFn: async () => {
            const response = await axios.get(
                `https://backend-hackathon-test2.vercel.app/franceMedalByYears`
            );
            return response.data as YearlyMedalCount[];
        },
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
}

export const getFranceMedal = () => {
    return useQuery({
        queryKey: ["franceMedal"],
        queryFn: async () => {
            const response = await axios.get(
                `https://backend-hackathon-test2.vercel.app/franceMedal`
            );
            return response.data as MedalCount[];
        },
    });
}

export const getCountry = (start: number, end: number) => {
    return useQuery({
        queryKey: ["country", start, end],
        queryFn: async () => {
            const response = await axios.get(
                `https://backend-hackathon-test2.vercel.app/participating_countries?_start=${start}&_end=${end}`
            );
            return response.data as Country[];
        },
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
};

export const getCountryDetails = (countryId: string) => {
    return useQuery({
        queryKey: ['countryDetails', countryId],
        queryFn: async () => {
            const response = await axios.get(`https://backend-hackathon-test2.vercel.app/country_details?country=${countryId}`);
            return response.data as CountryDetails;
        },
        refetchOnWindowFocus: false,
    });
};