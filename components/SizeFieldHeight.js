import { Box } from 'grommet';
import SizeField from './SizeField';

const SizeFieldHeight = ({ name, label, value, getValidSize, updateValue }) => {
  const feet = Math.floor(value.size / 12);
  const inches = value.size - feet * 12;

  return (
    <fieldset>
      <legend>{label}</legend>
      {(value.unit === 'in' && (
        <Box direction="row">
          <input
            name={name}
            value={feet}
            onFocus={event => {
              event.target.select();
            }}
            onChange={event => {
              const newFeet = getValidSize(event.target.value);
              // console.log({ newFeet });
              switch (typeof newFeet) {
                case 'number':
                  return updateValue(newFeet * 12 + inches, value.unit);
                case 'string':
                  return updateValue(newFeet, value.unit);
              }
            }}
            type="number"
            style={{ width: '2rem', marginRight: '.25rem' }}
          />
          <label htmlFor={name} style={{ marginRight: '1.25rem' }}>
            ft
          </label>
          <input
            name={name + '_in'}
            value={inches}
            onChange={event => {
              const newInches = getValidSize(event.target.value);
              // console.log({ newInches });
              switch (typeof newInches) {
                case 'number':
                  return updateValue(feet * 12 + newInches, value.unit);
                case 'string':
                  return updateValue(newInches, value.unit);
              }
            }}
            onFocus={event => {
              event.target.select();
            }}
            type="number"
            style={{ width: '2rem', marginRight: '.25rem' }}
          />
          <label htmlFor={name + '_in'} style={{ marginRight: '1.25rem' }}>
            in
          </label>
        </Box>
      )) || (
        <React.Fragment>
          <input
            name={name}
            value={value.size}
            onChange={event => {
              const size = getValidSize(event.target.value);
              if (typeof size !== 'undefined') {
                updateValue(size);
              }
            }}
            type="number"
            style={{ marginRight: '.25rem' }}
          />
          <label htmlFor={name}>cm</label>
        </React.Fragment>
      )}
    </fieldset>
  );
};

export default SizeFieldHeight;
