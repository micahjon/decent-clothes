import {
  Box,
  Heading,
  Paragraph,
  Markdown,
  CheckBox,
  FormField,
  TextInput,
  Split,
  Label,
} from 'grommet';
import SizeField from './SizeField';
import { Formik, FastField, Field } from 'formik';

const SizeForm = props => {
  return (
    <Box>
      <Formik
        initialValues={{
          body: {
            height: '50',
            neckAround: 20,
          },

          email: '',
          password: '',
        }}
        validate={values => {
          let errors = {};
          // if (!values.email) {
          //   errors.email = 'Required';
          // } else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          // ) {
          //   errors.email = 'Invalid email address';
          // }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <h2>The Basics</h2>
            <Field
              name="body_height"
              render={({ field, form }) => (
                <SizeField field={field} label="Height" />
              )}
            />
            <FastField
              name="body_weight"
              render={({ field, form }) => (
                <Box pad="small">
                  <label>Weight</label>
                  <Box direction="row">
                    <input
                      type="number"
                      {...field}
                      style={{ marginRight: 'auto' }}
                    />
                    <CheckBox label="lbs / kg" toggle={true} />
                  </Box>
                </Box>
              )}
            />

            {/* <button type="submit" disabled={isSubmitting}>
            Submit
          </button> */}
          </form>
        )}
      </Formik>
      <style jsx>{``}</style>
    </Box>
  );
};

export default SizeForm;
