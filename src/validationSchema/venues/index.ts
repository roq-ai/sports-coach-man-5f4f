import * as yup from 'yup';

export const venueValidationSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  training_day: yup.string().required(),
  venue_manager_id: yup.string().nullable(),
});
