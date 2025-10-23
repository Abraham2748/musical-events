import { Concert } from './concert.model';
import { Genre } from './genre.model';

export interface HomeApiResponse {
  concerts: Concert[];
  genres: Genre[];
  success: boolean;
}
