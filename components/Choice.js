import { RadioGroup, Radio } from 'react-radio-group';

const Choice = props => {
  const { selectedValue, handleChange, style, options } = props;
  return (
    <React.Fragment>
      <RadioGroup
        selectedValue={selectedValue}
        onChange={handleChange}
        style={style}
      >
        {options.map((option, i) => (
          <label
            key={option}
            style={{
              marginLeft: i === 0 ? '' : '8px',
              background: option === selectedValue ? '#f5f5f5' : '',
            }}
            className={option === selectedValue ? 'radio-checked' : ''}
          >
            <Radio
              value={option}
              style={{
                position: 'absolute',
                opacity: '0',
                zIndex: '-1',
              }}
            />
            {option}
          </label>
        ))}
      </RadioGroup>
      <style jsx>
        {`
          label {
            border: 1px solid #f5f5f5;
            display: inline-block;
            text-align: center;
            min-width: 2rem;
            line-height: 1.5rem;
            height: 1.5rem;
            padding: 0 4px;
            border-radius: 3px;
          }
        `}
      </style>
    </React.Fragment>
  );
};

export default Choice;
