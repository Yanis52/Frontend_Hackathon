export interface Host {
    index: number;
    game_slug: string;
    game_end_date: string;
    game_start_date: string;
    game_location: string;
    game_name: string;
    game_season: "Summer" | "Winter";
    game_year: string;
}

export interface CountryDetails {
    hostedGames: string[];
    athletes: string[];
    medals: {
        gold: number;
        silver: number;
        bronze: number;
    };
}

export interface Country {
    id: number;
    country_name: string;
    noc: string;
}