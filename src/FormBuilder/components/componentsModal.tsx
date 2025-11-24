import { useState } from "react";
import { useFormBuilder } from "../../store/useFormBuilder";
import {
  createTextInput,
  createNumberInput,
  createButton,
  createSelectField,
  createCheckboxField,
  createRadioField,
  createPasswordInput,
  createTextarea,
} from "../utils/FormFields";

export default function ComponentsModal({
  isOpen,
  setOpen,
  row_index,
}: {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
  row_index: number;
}) {
  const registerField = useFormBuilder((s) => s.registerField);

  const [selectedType, setSelectedType] = useState<string>("text");
  const [fieldName, setFieldName] = useState<string>("");
  const [fieldLabel, setFieldLabel] = useState<string>("");
  const [fieldPlaceholder, setFieldPlaceholder] = useState<string>("");

  const [required, setRequired] = useState<boolean>(false);
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");
  const [minLength, setMinLength] = useState<string>("");
  const [maxLength, setMaxLength] = useState<string>("");
  const [pattern, setPattern] = useState<string>("");

  const [options, setOptions] = useState<string>("");

  if (!isOpen) return null;

  const handleAddField = () => {
    let field;
    const opts = options
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean);

    switch (selectedType) {
      case "text":
        field = createTextInput(fieldName, fieldLabel, fieldPlaceholder);
        break;
      case "number":
        field = createNumberInput(fieldName, fieldLabel, fieldPlaceholder);
        break;
      case "password":
        field = createPasswordInput(fieldName, fieldLabel, fieldPlaceholder);
        break;
      case "button":
        field = createButton(fieldName, fieldLabel);
        break;
      case "select":
        field = createSelectField(fieldName, opts, fieldLabel);
        break;
      case "textarea":
        field = createTextarea(fieldName, fieldLabel);
        break;
      case "checkbox":
        field = createCheckboxField(fieldName, opts, fieldLabel);
        break;
      case "radio":
        field = createRadioField(fieldName, opts, fieldLabel);
        break;
      default:
        return;
    }

    field.validations = {
      required,
      min: min ? Number(min) : undefined,
      max: max ? Number(max) : undefined,
      minLength: minLength ? Number(minLength) : undefined,
      maxLength: maxLength ? Number(maxLength) : undefined,
      pattern: pattern || undefined,
    };

    registerField(row_index, field);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[750px] p-6 relative overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-6">Add New Field</h2>

        <div className="mb-6">
          <label className="font-medium block mb-2">Field Type:</label>

          <div className="grid grid-cols-3 gap-3">
            {[
              { type: "text", label: "Text" },
              { type: "textarea", label: "TextAddress" },
              { type: "number", label: "Number" },
              { type: "password", label: "Password" },
              { type: "button", label: "Button" },
              { type: "select", label: "Select" },
              { type: "checkbox", label: "Checkbox" },
              { type: "radio", label: "Radio" },
            ].map((item) => (
              <button
                key={item.type}
                onClick={() => setSelectedType(item.type)}
                className={`p-2 rounded-md border text-center transition
                  ${
                    selectedType === item.type
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white hover:bg-gray-100"
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <label className="font-medium">Field Name(Unique):</label>
          <input
            type="text"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>

        <div className="space-y-2 mb-4">
          <label className="font-medium">Field Label:</label>
          <input
            type="text"
            value={fieldLabel}
            onChange={(e) => setFieldLabel(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        </div>

        {["text", "number", "password", "textarea"].includes(selectedType) && (
          <div className="space-y-2 mb-4">
            <label className="font-medium">Placeholder:</label>
            <input
              type="text"
              value={fieldPlaceholder}
              onChange={(e) => setFieldPlaceholder(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
          </div>
        )}

        {["select", "checkbox", "radio"].includes(selectedType) && (
          <div className="space-y-2 mb-4">
            <label className="font-medium">Options (comma separated):</label>
            <input
              type="text"
              value={options}
              onChange={(e) => setOptions(e.target.value)}
              className="border p-2 rounded-md w-full"
              placeholder="Option1, Option2, Option3"
            />
          </div>
        )}

        <h3 className="text-lg font-semibold mt-6 mb-3">Validations</h3>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
          <label>Required</label>
        </div>

        {["text", "password", "textarea"].includes(selectedType) && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label>Min Length:</label>
              <input
                type="number"
                value={minLength}
                onChange={(e) => setMinLength(e.target.value)}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div>
              <label>Max Length:</label>
              <input
                type="number"
                value={maxLength}
                onChange={(e) => setMaxLength(e.target.value)}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div className="col-span-2">
              <label>Pattern (Regex):</label>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="border p-2 rounded-md w-full"
                placeholder="^[A-Za-z0-9]+$"
              />
            </div>
          </div>
        )}

        {selectedType === "number" && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label>Min Value:</label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                className="border p-2 rounded-md w-full"
              />
            </div>

            <div>
              <label>Max Value:</label>
              <input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                className="border p-2 rounded-md w-full"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setOpen(false)}
            className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleAddField}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
}
