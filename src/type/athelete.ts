export interface Athlete {
  athlete_url: string;
  athlete_full_name: string;
  games_participations: number;
  first_game: string;
  athlete_year_birth: number;
  athlete_medals: string;
  bio: string;
  id: string
}

export interface AthleteSimple {
  athlete_full_name: string;
  games_participations: number;
  first_game: string;
  id: string
}
