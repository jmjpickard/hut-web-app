import clx from "classnames";
import styles from "./input.module.scss";

interface Props {
  id?: string;
  type?: string;
  className?: string;
  containerClassName?: string;
  size?: InputSize;
  placeholder?: string;
  label?: string;
  onChange?: (val: string, isValid: boolean) => void;
  value?: string | number;
  rawProps?: React.InputHTMLAttributes<HTMLInputElement>;
  errorMessage?: string;
}

export type InputSize = "large" | "medium" | "small";
export type Variant = "primary" | "transparent";

const getClassSize = (size?: InputSize) => {
  switch (size) {
    case "large":
      return styles.large;
    case "medium":
      return styles.medium;
    case "small":
      return styles.small;
  }

  return styles.medium;
};

const isValid = (value: string, type?: string) => {
  if (type === "email") {
    return /(.+)@(.+){2,}\.(.+){2,}/.test(value);
  }

  return true;
};

const getInputType = (type?: string) => {
  if (type === "height") {
    return "number";
  }

  if (type === "weight") {
    return "number";
  }

  if (type === undefined) {
    return "text";
  }

  return type;
};

export const Input: React.FC<Props> = ({
  rawProps,
  id,
  type,
  size,
  placeholder,
  label,
  onChange,
  value,
  className,
  containerClassName,
  errorMessage
}: Props) => {
  const inputProps = () => {
    if (rawProps) {
      return rawProps;
    }
    return {
      onChange: (evt: { currentTarget: { value: string } }) => {
        const val = evt.currentTarget.value;
        if (onChange) {
          onChange(val, isValid(val, type));
        }
      },
      onWheel: (e: { currentTarget: HTMLInputElement }) => {
        const element = e.currentTarget as HTMLInputElement;
        element.blur();
      },
      value: value
    };
  };

  return (
    <div className={clx(styles.container, containerClassName)}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        id={id}
        placeholder={placeholder}
        type={getInputType(type)}
        className={clx(getClassSize(size), styles.main, className)}
        {...inputProps()}
      />
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};
