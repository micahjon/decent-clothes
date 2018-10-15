import { Box } from 'grommet';

class SizeField extends React.Component {
  constructor(props) {
    super(props);
    props.registerUnitChangeListener(
      this.props.name,
      this.handleUnitChange.bind(this)
    );
  }

  shouldComponentUpdate(nextProps) {
    const { value } = this.props;
    return (
      value.size !== nextProps.value.size || value.unit !== nextProps.value.unit
    );
  }

  handleUnitChange(unit, convertSize) {
    const currentSize = this.props.value.size;
    this.updateValue(currentSize === '' ? '' : convertSize(currentSize), unit);
  }

  updateValue(size, unit = this.props.unit) {
    this.props.setFieldValue(this.props.name, { size, unit });
  }

  render() {
    const { label, value, getValidSize } = this.props;

    console.log('render SizeField', this.props);

    if (this.props.render) {
      return this.props.render({
        label,
        value,
        getValidSize,
        updateValue: this.updateValue.bind(this),
      });
    }

    return (
      <Box>
        <label>{label}</label>
        <input
          value={value.size}
          onChange={event => {
            const size = getValidSize(event.target.value);
            if (typeof size !== 'undefined') {
              this.updateValue(size);
            }
          }}
          type="number"
          style={{ width: '4rem', marginRight: '1rem' }}
        />
      </Box>
    );
  }
}

export default SizeField;
