import { Box } from 'grommet';
import { RadioGroup, Radio } from 'react-radio-group';

const toQuarter = num => (Math.round(num * 4) / 4).toFixed(2);
const toHalf = num => (Math.round(num * 2) / 2).toFixed(1);

const conversions = {
  in: cm => toQuarter(cm / 2.54),
  cm: inches => toHalf(inches * 2.54),
};

class SizeField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: 'in',
      value: '',
    };
  }

  handleUnitChange(unit) {
    this.setState({
      unit: unit,
      value: conversions[unit](this.state.value),
    });
  }

  render() {
    const props = this.props;
    const units = ['in', 'cm'];

    // console.log('props', props);

    const options = props.options || ['in', 'cm'];
    return (
      <Box pad="small">
        <label>{props.label}</label>
        <Box direction="row">
          <input
            value={this.state.value}
            onChange={event => {
              const value = event.target.value;
              if (/[0-9.]*/.test(value)) {
                this.setState({ value: parseFloat(value) });
              }
            }}
            // {...props.field}
            type="number"
            style={{ marginRight: 'auto' }}
          />
          <RadioGroup
            name="unit"
            selectedValue={this.state.unit}
            onChange={this.handleUnitChange.bind(this)}
          >
            {units.map(unit => (
              <label key={unit}>
                <Radio value={unit} />
                {unit}
              </label>
            ))}
          </RadioGroup>
        </Box>
      </Box>
    );
  }
}

export default SizeField;
