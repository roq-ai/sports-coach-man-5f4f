import * as yup from 'yup';

export const trainingGroupValidationSchema = yup.object().shape({
  name: yup.string().required(),
  schedule: yup.string().required(),
  coach_id: yup.string().nullable(),
  athlete_id: yup.string().nullable(),
});
