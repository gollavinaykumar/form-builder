import type { Field } from "../../interfaces/Form";

export default function FieldRenderer({
  key,
  field,
}: {
  key: number;
  field: Field;
}) {
  const validationProps = {
    required: field.validations?.required,
    min: field.validations?.min,
    max: field.validations?.max,
    minLength: field.validations?.minLength,
    maxLength: field.validations?.maxLength,
    pattern:
      field.validations?.pattern instanceof RegExp
        ? field.validations.pattern.source
        : field.validations?.pattern,
  };

  switch (field.HtmlTag) {
    case "input":
      if (field.Type === "checkbox") {
        return (
          <div className="flex flex-col gap-1" key={key}>
            <label>{field.label}</label>
            {field.options?.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={field.name}
                  value={option}
                  required={field.validations?.required}
                />
                {option}
              </label>
            ))}
          </div>
        );
      }

      if (field.Type === "radio") {
        return (
          <div className="flex flex-col gap-1" key={key}>
            <label>{field.label}</label>
            {field.options?.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  required={field.validations?.required}
                />
                {option}
              </label>
            ))}
          </div>
        );
      }

      return (
        <div className="flex flex-col gap-1" key={key}>
          <label>{field.label}</label>
          <input
            type={field.Type}
            name={field.name}
            placeholder={field.placeholder}
            className="border p-2 rounded"
            {...validationProps}
          />
        </div>
      );

    case "textarea":
      return (
        <div className="flex flex-col gap-1" key={key}>
          <label>{field.label}</label>
          <textarea
            name={field.name}
            placeholder={field.placeholder}
            className="border p-2 rounded"
            {...validationProps}
          />
        </div>
      );

    case "select":
      return (
        <div className="flex flex-col gap-1" key={key}>
          <label>{field.label}</label>
          <select
            name={field.name}
            className="border p-2 rounded"
            {...validationProps}
          >
            {field.options?.map((option) => (
              <option key={option} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );

    case "button":
      return (
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
          key={key}
        >
          {field.label || field.name}
        </button>
      );

    default:
      return null;
  }
}
