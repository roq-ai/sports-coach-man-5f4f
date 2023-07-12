import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createVenue } from 'apiSdk/venues';
import { Error } from 'components/error';
import { venueValidationSchema } from 'validationSchema/venues';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { VenueInterface } from 'interfaces/venue';

function VenueCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: VenueInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createVenue(values);
      resetForm();
      router.push('/venues');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<VenueInterface>({
    initialValues: {
      name: '',
      address: '',
      training_day: '',
      venue_manager_id: (router.query.venue_manager_id as string) ?? null,
    },
    validationSchema: venueValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Venue
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="address" mb="4" isInvalid={!!formik.errors?.address}>
            <FormLabel>Address</FormLabel>
            <Input type="text" name="address" value={formik.values?.address} onChange={formik.handleChange} />
            {formik.errors.address && <FormErrorMessage>{formik.errors?.address}</FormErrorMessage>}
          </FormControl>
          <FormControl id="training_day" mb="4" isInvalid={!!formik.errors?.training_day}>
            <FormLabel>Training Day</FormLabel>
            <Input type="text" name="training_day" value={formik.values?.training_day} onChange={formik.handleChange} />
            {formik.errors.training_day && <FormErrorMessage>{formik.errors?.training_day}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'venue_manager_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'venue',
    operation: AccessOperationEnum.CREATE,
  }),
)(VenueCreatePage);
