import { Box } from 'grommet';
import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
import Choice from './Choice';

class SizeFieldShirt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: props.defaultSize,
      length: 'regular',
    };
  }

  updateSize(size) {
    this.setState({ size }, this.updateFieldValue.bind(this));
  }

  updateLength(length) {
    this.setState({ length }, this.updateFieldValue.bind(this));
  }

  updateFieldValue() {
    const { size, length } = this.state;
    this.props.setFieldValue(this.props.name, { size, length });
  }

  render() {
    const { name, label, value, updateValue, setFieldValue } = this.props;

    return (
      <Box pad="small">
        <label htmlFor="" style={{ lineHeight: '2rem' }}>
          {label}
        </label>
        <Slider
          min={0}
          max={5}
          step={0.5}
          defaultValue={this.state.size}
          marks={{
            0: 'XS',
            1: 'S',
            2: 'M',
            3: 'L',
            4: 'XL',
            5: 'XXL',
          }}
          style={{ minHeight: '3rem' }}
          onAfterChange={this.updateSize.bind(this)}
        />
        {/* <label htmlFor="">Do you prefer a tall size?</label> */}
        <Choice
          selectedValue={this.state.length}
          handleChange={this.updateLength.bind(this)}
          options={['regular', 'tall']}
        />
      </Box>
    );
  }
}
export default SizeFieldShirt;
