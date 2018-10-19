import { Box } from 'grommet';

class SizeField extends React.Component {
  constructor(props) {
    super(props);
    props.registerUnitChangeListener(props.name, this.handleUnitChange.bind(this));
  }

  shouldComponentUpdate(nextProps) {
    const props = this.props;
    const changes = ['unit', 'placeholder'];
    return (
      props.value.size !== nextProps.value.size
      || changes.some(prop => props[prop] !== nextProps[prop])
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
    const {
      label, value, getValidSize, style, placeholder,
    } = this.props;

    // console.log('render SizeField', this.props);

    if (this.props.render) {
      return this.props.render({
        label,
        value,
        getValidSize,
        updateValue: this.updateValue.bind(this),
      });
    }

    return (
      <Box style={style}>
        <label>{label}</label>
        <input
          value={value.size}
          onChange={(event) => {
            const size = getValidSize(event.target.value);
            if (typeof size !== 'undefined') {
              this.updateValue(size);
            }
          }}
          type="number"
          style={{}}
          placeholder={placeholder > 0 ? placeholder : ''}
        />
      </Box>
    );
  }
}

export default SizeField;
