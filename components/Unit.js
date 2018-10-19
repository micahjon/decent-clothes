import { Box } from 'grommet';
import Choice from './Choice';
import { conversions } from '../services/conversions';

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

class Unit extends React.Component {
  constructor(props) {
    super(props);
    // this.name = 'unit-' + Math.round(Math.random() * 1000000);
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
    // console.log('listeners', Object.keys(this.listeners).length);
  }

  handleUnitChange(unit) {
    this.setState({ unit });
    Object.values(this.listeners).forEach(listener => {
      listener(unit, conversions[unit]);
    });
  }

  render() {
    // console.log('render unit');

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
          unit: this.state.unit,
        })}
        <Choice
          selectedValue={this.state.unit}
          handleChange={this.handleUnitChange.bind(this)}
          style={{ marginLeft: 'auto' }}
          options={units}
        />
      </Box>
    );
  }
}

export default Unit;
