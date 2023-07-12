import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface VenueInterface {
  id?: string;
  name: string;
  address: string;
  training_day: string;
  venue_manager_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface VenueGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  address?: string;
  training_day?: string;
  venue_manager_id?: string;
}
