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
import SizeUnit from './SizeUnit';
import SizeField from './SizeField';
import SizeFieldHeight from './SizeFieldHeight';
import { Formik, FastField, Field } from 'formik';

import Slider, { Range } from 'rc-slider';
import { default as rcSliderStyles } from 'rc-slider/assets/index.css';

const SizeForm = props => {
  return (
    <Box style={{ maxWidth: '432px' }}>
      <Formik
        initialValues={{
          // Basic
          height: { size: '60', unit: 'in' },
          weight: { size: '', unit: 'lbs' },
          shirt_size: { size: '', unit: '' },
          pant_waist: { size: '', unit: 'in' },
          pant_length: { size: '', unit: 'in' },
          // Advanced
          neck_around: { size: '', unit: 'in' },
          collar_around: { size: '', unit: 'in' },
          bicep_around: { size: '', unit: 'in' },
          sleeve_bicep_around: { size: '', unit: 'in' },
          forearm_around: { size: '', unit: 'in' },
          sleeve_forearm_around: { size: '', unit: 'in' },
          wrist_around: { size: '', unit: 'in' },
          cuff_around: { size: '', unit: 'in' },
          torso_length: { size: '', unit: 'in' },
          shirt_length: { size: '', unit: 'in' },
          sleeve_length: { size: '', unit: 'in' },
          shoulder_width: { size: '', unit: 'in' },
          chest_around: { size: '', unit: 'in' },
          shirt_chest_around: { size: '', unit: 'in' },
          waist_around: { size: '', unit: 'in' },
          shirt_waist_around: { size: '', unit: 'in' },
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {/* values,
          errors,
          touched,
          handleChange,
          handleBlur, */}
        {({
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Heading level={2}>1. The Basics</Heading>

            <SizeUnit
              render={unit => (
                <Field
                  name="height"
                  render={({ field, form }) => (
                    <SizeField
                      {...field}
                      {...unit}
                      setFieldValue={form.setFieldValue}
                      label="Height"
                      render={SizeFieldHeight}
                    />
                  )}
                />
              )}
            />
            <SizeUnit
              units={['lbs', 'kg']}
              render={unit => (
                <Field
                  name="weight"
                  render={({ field, form }) => (
                    <SizeField
                      {...field}
                      {...unit}
                      setFieldValue={form.setFieldValue}
                      label="Weight"
                    />
                  )}
                />
              )}
            />

            <Box pad="small" style={{ minHeight: '6rem' }}>
              <label htmlFor="" style={{ lineHeight: '2rem' }}>
                Shirt Size
              </label>
              <Slider
                min={0}
                max={20}
                defaultValue={3}
                marks={{
                  0: 'XS',
                  4: 'S',
                  8: 'M',
                  12: 'L',
                  16: 'XL',
                  20: 'XXL',
                }}
              />
            </Box>

            <Heading level={3}>What size pants fit you best?</Heading>
            <SizeUnit
              render={unit => (
                <React.Fragment>
                  <Field
                    name="pant_waist"
                    render={({ field, form }) => (
                      <SizeField
                        {...field}
                        {...unit}
                        setFieldValue={form.setFieldValue}
                        label="Waist"
                      />
                    )}
                  />
                  <Field
                    name="pant_length"
                    render={({ field, form }) => (
                      <SizeField
                        {...field}
                        {...unit}
                        setFieldValue={form.setFieldValue}
                        label="Length"
                      />
                    )}
                  />
                </React.Fragment>
              )}
            />
            <Heading level={2}>2. Specific Sizes</Heading>
            <p>
              This section is optional, but we recommend you complete as much of
              it as you can to improve your fit.
            </p>
            <p>
              Click to [icon] to see a brief video of how to take each size
              measurement
            </p>
            {Object.entries({
              neck_around: 'Neck Around',
              sleeve_length: 'Sleeve Length',
              bicep_around: 'Bicep Around',
              forearm_around: 'Forearm Around',
              wrist_around: 'Wrist Around',
              shoulder_width: 'Shoulder Width',
              chest_around: 'Chest Around',
              waist_around: 'Waist Around',
            }).map(([name, label]) => {
              return (
                <SizeUnit
                  render={unit => (
                    <Field
                      name={name}
                      render={({ field, form }) => (
                        <SizeField
                          {...field}
                          {...unit}
                          setFieldValue={form.setFieldValue}
                          label={label}
                        />
                      )}
                    />
                  )}
                />
              );
            })}

            {/* <Field
              name="shirt_size"
              render={({ field, form }) => (
                <SizeField field={field} label="Shirt Size" />
              )}
            />
            <h3>What size of pants fit you best?</h3>
            <Field
              name="pant_waist"
              render={({ field, form }) => (
                <SizeField
                  field={field}
                  fields={{ waist: 'Waist', length: 'Length' }}
                />
              )}
            />
            <Field
              name="pant_length"
              render={({ field, form }) => (
                <SizeField
                  field={field}
                  fields={{ waist: 'Waist', length: 'Length' }}
                />
              )}
            /> */}
            {/* <Field
              name="pant_length"
              render={({ field, form }) => (
                <SizeField field={field} label="Length" units={['lbs', 'kg']} />
              )}
            /> */}

            {/* <button type="submit" disabled={isSubmitting}>
            Submit
          </button> */}
          </form>
        )}
      </Formik>
      <style jsx global>
        {rcSliderStyles}
      </style>
      <style jsx>{``}</style>
    </Box>
  );
};

export default SizeForm;

// <FastField
//   name="body_weight"
//   render={({ field, form }) => (
//     <Box pad="small">
//       <label>Weight</label>
//       <Box direction="row">
//         <input
//           type="number"
//           {...field}
//           style={{ marginRight: 'auto' }}
//         />
//         <CheckBox label="lbs / kg" toggle={true} />
//       </Box>
//     </Box>
//   )}
// />
