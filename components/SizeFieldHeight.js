import { Box } from 'grommet';
import SizeField from './SizeField';

const SizeFieldHeight = ({
  label, value, getValidSize, updateValue,
}) => {
  const feet = Math.floor(value.size / 12);
  const inches = value.size - feet * 12;

  return (
    <Box>
      <label>{label}</label>
      {(value.unit === 'in' && (
        <Box direction="row">
          <input
            value={feet}
            onFocus={(event) => {
              event.target.select();
            }}
            onChange={(event) => {
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
          <label style={{ marginRight: '1.25rem' }}>ft</label>
          <input
            value={inches}
            onChange={(event) => {
              const newInches = getValidSize(event.target.value);
              // console.log({ newInches });
              switch (typeof newInches) {
                case 'number':
                  return updateValue(feet * 12 + newInches, value.unit);
                case 'string':
                  return updateValue(newInches, value.unit);
              }
            }}
            onFocus={(event) => {
              event.target.select();
            }}
            type="number"
            style={{ width: '2rem', marginRight: '.25rem' }}
          />
          <label style={{ marginRight: '1.25rem' }}>in</label>
        </Box>
      )) || (
        <input
          value={value.size}
          onChange={(event) => {
            const size = getValidSize(event.target.value);
            if (typeof size !== 'undefined') {
              updateValue(size);
            }
          }}
          type="number"
        />
      )}
    </Box>
  );
};

export default SizeFieldHeight;
