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
      <Box
        direction="row"
        align="end"
        pad="small"
        style={{ minHeight: '3rem' }}
      >
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
            <label
              key={unit}
              style={{
                marginLeft: i === 0 ? '' : '8px',
                background: unit === this.state.unit ? '#f5f5f5' : '',
              }}
            >
              <Radio
                value={unit}
                style={{
                  //   marginRight: '40px',
                  position: 'absolute',
                  opacity: '0',
                  zIndex: '-1',
                }}
              />
              {unit}
            </label>
          ))}
        </RadioGroup>
        <style jsx>{`
          label {
            border: 1px solid #f5f5f5;
            display: inline-block;
            text-align: center;
            min-width: 2rem;
            line-height: 1.5rem;
            height: 1.5rem;
          }
        `}</style>
      </Box>
    );
  }
}

export default SizeUnit;
