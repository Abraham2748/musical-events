import { Concert } from './concert';
import { Genre } from './genre';

export interface HomeApiResponse {
  concerts: Concert[];
  genres: Genre[];
  success: boolean;
}
