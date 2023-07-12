import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TrainingGroupInterface {
  id?: string;
  name: string;
  schedule: string;
  coach_id?: string;
  athlete_id?: string;
  created_at?: any;
  updated_at?: any;

  user_training_group_coach_idTouser?: UserInterface;
  user_training_group_athlete_idTouser?: UserInterface;
  _count?: {};
}

export interface TrainingGroupGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  schedule?: string;
  coach_id?: string;
  athlete_id?: string;
}
