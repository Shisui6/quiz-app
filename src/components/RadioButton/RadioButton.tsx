import { useAppSelector } from "../../redux/hooks";
import { selectPopedQuestion } from "../../redux/questions/questions";

/**
 * The type for the props of the RadioButton component.
 *
 * @typedef {Object} FieldProps
 * @property {string} name - The name of the input field.
 * @property {string} value - The value of the input field.
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} onChange - The function to call when the input field changes.
 * @property {(event?: React.FocusEvent<HTMLInputElement>) => void} onBlur - The function to call when the input field loses focus.
 */
type FieldProps = {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event?: React.FocusEvent<HTMLInputElement>) => void;
};


/**
 * The type for the props of the RadioButton component.
 *
 * @typedef {Object} RadioButtonProps
 * @property {FieldProps} field - The props for the input field.
 * @property {string} id - The id of the radio button.
 * @property {string} label - The label of the radio button.
 * @property {string} [className] - The CSS class of the radio button.
 * @property {React.InputHTMLAttributes<HTMLInputElement>} [props] - The additional props for the radio button.
 */
type RadioButtonProps = {
  field: FieldProps;
  id: string;
  label: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;


/**
 * The RadioButton component displays a radio button with a label.
 * It is used in a form to allow the user to select an option.
 *
 * @component
 */
const RadioButton: React.FC<RadioButtonProps> = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  const popedQuestion = useAppSelector(selectPopedQuestion);

  return (
    <div className="pl-5 py-3 rounded-xl mb-4 bg-gray-50 cursor-pointer hover:bg-gray-100 duration-150 relative">
      <label htmlFor={id}>
        <input
            name={name}
            id={id}
            type="radio"
            value={id}
            checked={id === value || id === popedQuestion.choice}
            onChange={onChange}
            onBlur={onBlur}
            className={className}
            {...props}
        />
        {label}
        <span></span>
      </label>
    </div>
  );
};

export default RadioButton;
