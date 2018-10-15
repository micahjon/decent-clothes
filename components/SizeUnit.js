import { Box } from 'grommet';
import { RadioGroup, Radio } from 'react-radio-group';

const toQuarter = num => Math.round(num * 4) / 4;
const toHalf = num => Math.round(num * 2) / 2;

const round = {
  in: toQuarter,
  cm: toHalf,
  lbs: Math.round,
  kg: toHalf,
};

const conversions = {
  in: cm => round.in(cm / 2.54),
  cm: inches => round.cm(inches * 2.54),
  lbs: kg => round.lbs(kg * 2.20462),
  kg: lbs => round.kg(lbs / 2.20462),
};

/**
 * Converts arbitrary user input into a valid input value
 * @param {string} value
 * @param {string} unit
 * @return {string/undefined}
 */
const getValidSize = (value, unit) => {
  if (value === '') return value;
  const number = parseFloat(value);
  if (!isNaN(number)) {
    return Math.abs(number);
  }
  return undefined;
};

const defaultUnits = ['in', 'cm'];

class SizeUnit extends React.Component {
  constructor(props) {
    super(props);
    // this.name = 'sizeunit-' + Math.round(Math.random() * 1000000);
    this.listeners = {};
    this.state = {
      unit: props.selectedUnit || (props.units || defaultUnits)[0],
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.unit !== nextState.unit;
  }

  registerUnitChangeListener(name, listener) {
    this.listeners[name] = listener;
    console.log('listeners', Object.keys(this.listeners).length);
  }

  handleUnitChange(unit) {
    this.setState({ unit });
    Object.values(this.listeners).forEach(listener => {
      listener(unit, conversions[unit]);
    });
  }

  render() {
    console.log('render unit');

    const units = this.props.units || defaultUnits;
    return (
      <Box direction="row" align="end">
        {this.props.render({
          registerUnitChangeListener: this.registerUnitChangeListener.bind(
            this
          ),
          getValidSize,
        })}
        <RadioGroup
          //   name={this.name}
          selectedValue={this.state.unit}
          onChange={this.handleUnitChange.bind(this)}
          style={{ marginLeft: 'auto' }}
        >
          {units.map((unit, i) => (
            <label key={unit} style={{ marginLeft: i === 0 ? '' : '8px' }}>
              <Radio value={unit} style={{ marginRight: '4px' }} />
              {unit}
            </label>
          ))}
        </RadioGroup>
      </Box>
    );
  }
}

export default SizeUnit;
