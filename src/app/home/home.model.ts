import { Concert } from '../shared/models/Concert.model';
import { Genre } from '../shared/models/Genre.model';

export interface HomeApiResponse {
  concerts: Concert[];
  genres: Genre[];
  success: boolean;
}
