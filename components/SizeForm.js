import { Box, Heading, Button } from 'grommet';
import Unit from './Unit';
import SizeField from './SizeField';
import SizeFieldHeight from './SizeFieldHeight';
import { Formik, FastField, Field } from 'formik';
import SizeFieldShirt from './SizeFieldShirt';
import { conversions, shirtSize } from '../services/conversions';
import fetch from 'unfetch';
import { getLocalProfile, getLocalSession } from '../services/AuthLite';

const neckToCollar = unit => (unit === 'in' ? 1 : 2.5);
const between = (min, mid, max) => Math.max(min, Math.min(mid, max));

// Prediction equations
const neckAround = ({ collar_size, shirt_size }, { unit }) => {
  if (collar_size.size) {
    return collar_size.size - neckToCollar(unit);
  }
  if (shirt_size.size) {
    const size = 13.25 + shirt_size.size;
    return unit === 'in' ? size : conversions['cm'](size);
  }
};
const collarSize = ({ neck_around, shirt_size }, { unit }) => {
  if (neck_around.size) {
    return neck_around.size + neckToCollar(unit);
  }
  if (shirt_size.size) {
    const size = 13.25 + shirt_size.size + neckToCollar('in');
    return unit === 'in' ? size : conversions['cm'](size);
  }
};
const chestSize = ({ shirt_size }, { unit }) => {
  const size = 31 + shirt_size.size * 4;
  return unit === 'in' ? size : conversions['cm'](size);
};
const sleeveLength = ({ shirt_size }, { unit }) => {
  const size = 31.25 + shirt_size.size;
  return unit === 'in' ? size : conversions['cm'](size);
};
const shoulderWidth = ({ shirt_size }, { unit }) => {
  let size = 14.75 + shirt_size.size;
  if (shirt_size.size >= 3.5) size -= 0.25;
  return unit === 'in' ? size : conversions['cm'](size);
};
const waistAround = ({ shirt_size }, { unit }) => {
  let size = 25 + shirt_size.size * 4;
  const overLarge = shirt_size.size - 3;
  if (overLarge > 0) size = between(size, size + overLarge, size + 2);
  return unit === 'in' ? size : conversions['cm'](size);
};

const encodeFormData = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

const netlifyFormName = 'body_size';

const SizeForm = props => {
  return (
    <Box style={{ maxWidth: '432px' }}>
      <Formik
        initialValues={{
          // Basic
          height: { size: 60, unit: 'in' },
          weight: { size: '', unit: 'lbs' },
          shirt_size: { size: 2.5, length: 'regular' },
          pant_waist: { size: '', unit: 'in' },
          pant_length: { size: '', unit: 'in' },
          // Advanced
          neck_around: { size: '', unit: 'in' },
          collar_size: { size: '', unit: 'in' },
          sleeve_length: { size: '', unit: 'in' },
          bicep_around: { size: '', unit: 'in' },
          // sleeve_bicep_around: { size: '', unit: 'in' },
          forearm_around: { size: '', unit: 'in' },
          // sleeve_forearm_around: { size: '', unit: 'in' },
          wrist_around: { size: '', unit: 'in' },
          // cuff_around: { size: '', unit: 'in' },
          // torso_length: { size: '', unit: 'in' },
          // shirt_length: { size: '', unit: 'in' },
          shoulder_width: { size: '', unit: 'in' },
          chest_around: { size: '', unit: 'in' },
          // shirt_chest_around: { size: '', unit: 'in' },
          waist_around: { size: '', unit: 'in' },
          // shirt_waist_around: { size: '', unit: 'in' },
        }}
        onSubmit={(values, { setSubmitting }) => {
          const sizes = {};
          Object.entries(values).forEach(([key, { size, unit, length }]) => {
            if (key === 'shirt_size') {
              sizes[key] = `${shirtSize(size)} ${length}`;
            } else {
              sizes[key] = size ? `${size}${unit}` : '';
            }
          });

          // @todo -> where is user email?

          const { name = '', sub: id = '' } = getLocalProfile() || {};
          // const { email = '' } = getLocalSession() || {};
          const user = {
            // email,
            name,
            id,
          };

          const netlifyFormValues = {
            'form-name': netlifyFormName,
            ...user,
            ...sizes,
          };

          // console.log(netlifyFormValues);

          fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encodeFormData(netlifyFormValues),
          })
            .then(
              () => {
                alert('Thanks!');
              },
              error => {
                console.error(
                  `Unable to submit Netlify form: ${netlifyFormName}`,
                  error
                );
              }
            )
            .then(() => {
              setSubmitting(false);
            });
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
          <form
            onSubmit={handleSubmit}
            name={netlifyFormName}
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <Heading level={2}>1. The Basics</Heading>

            <Unit
              render={unitProps => (
                <Field
                  name="height"
                  render={({ field, form }) => (
                    <SizeField
                      {...field}
                      {...unitProps}
                      form={form}
                      setFieldValue={form.setFieldValue}
                      label="Height"
                      render={SizeFieldHeight}
                    />
                  )}
                />
              )}
            />
            <Unit
              units={['lbs', 'kg']}
              render={unitProps => (
                <Field
                  name="weight"
                  render={({ field, form }) => (
                    <SizeField
                      {...field}
                      {...unitProps}
                      setFieldValue={form.setFieldValue}
                      label="Weight"
                    />
                  )}
                />
              )}
            />

            <Field
              name="shirt_size"
              render={({ field, form }) => (
                <SizeFieldShirt
                  {...field}
                  defaultSize={form.values.shirt_size.size}
                  setFieldValue={form.setFieldValue}
                  label="Shirt Size"
                />
              )}
            />

            <Heading level={3}>What size pants fit you best?</Heading>
            <Unit
              render={unitProps => (
                <React.Fragment>
                  <Field
                    name="pant_waist"
                    render={({ field, form }) => (
                      <SizeField
                        {...field}
                        {...unitProps}
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
                        {...unitProps}
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
            {/* <p>
              Click to [icon] to see a brief video of how to take each size
              measurement
            </p> */}
            <Unit
              render={unitProps => (
                <React.Fragment>
                  <Field
                    name="neck_around"
                    render={({ field, form }) => (
                      <SizeField
                        {...field}
                        {...unitProps}
                        setFieldValue={form.setFieldValue}
                        label="Neck Size"
                        placeholder={neckAround(form.values, unitProps)}
                      />
                    )}
                  />
                  <Field
                    name="collar_size"
                    render={({ field, form }) => (
                      <SizeField
                        {...field}
                        {...unitProps}
                        setFieldValue={form.setFieldValue}
                        label="Collar Size"
                        placeholder={collarSize(form.values, unitProps)}
                      />
                    )}
                  />
                </React.Fragment>
              )}
            />
            {Object.entries({
              sleeve_length: {
                label: 'Sleeve Length',
                prediction: sleeveLength,
              },
              bicep_around: { label: 'Bicep Around' },
              forearm_around: { label: 'Forearm Around' },
              wrist_around: { label: 'Wrist Around' },
              shoulder_width: {
                label: 'Shoulder Width',
                prediction: shoulderWidth,
              },
              chest_around: { label: 'Chest Around', prediction: chestSize },
              waist_around: { label: 'Waist Around', prediction: waistAround },
            }).map(([name, { label, prediction }]) => {
              return (
                <Unit
                  key={name}
                  render={unitProps => (
                    <Field
                      name={name}
                      render={({ field, form }) => (
                        <SizeField
                          {...field}
                          {...unitProps}
                          setFieldValue={form.setFieldValue}
                          label={label}
                          placeholder={
                            prediction && prediction(form.values, unitProps)
                          }
                        />
                      )}
                    />
                  )}
                />
              );
            })}
            <Box
              align="center"
              pad={{ vertical: 'medium', horizontal: 'small' }}
            >
              <Button
                primary
                plain={false}
                type="submit"
                disabled={isSubmitting}
                style={{ width: '100%' }}
              >
                Save & Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <style jsx>{``}</style>
    </Box>
  );
};

export default SizeForm;
