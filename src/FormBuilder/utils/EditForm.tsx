import type { Field } from "../../interfaces/Form";

interface EditFormProps {
  fieldData: Field;
  setFieldData: React.Dispatch<React.SetStateAction<Field>>;
  onSave: () => void;
  onClose: () => void;
}

export default function EditForm({
  fieldData,
  setFieldData,
  onSave,
  onClose,
}: EditFormProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 ">
      <div className="bg-white p-6 w-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Edit Field</h3>

        <label className="block mb-1 font-medium">Field Type</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {[
            "text",
            "email",
            "password",
            "number",
            "select",
            "checkbox",
            "radio",
          ].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setFieldData((prev) => ({
                  ...prev,
                  Type: type as Field["Type"],
                  options: ["select", "checkbox", "radio"].includes(type)
                    ? prev.options
                    : undefined,
                }));
              }}
              className={`px-3 py-1 rounded border ${
                fieldData.Type === type
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <label className="block mb-1 font-medium">Label</label>
        <input
          type="text"
          value={fieldData.label || ""}
          placeholder="Field Label"
          onChange={(e) =>
            setFieldData((prev) => ({ ...prev, label: e.target.value }))
          }
          className="border p-2 w-full mb-3 rounded"
        />

        <label className="block mb-1 font-medium">Name (unique)</label>
        <input
          type="text"
          value={fieldData.name}
          placeholder="Field Name"
          onChange={(e) => setFieldData({ ...fieldData, name: e.target.value })}
          className="border p-2 w-full mb-3 rounded"
        />

        {["text", "email", "password", "number"].includes(fieldData.Type) && (
          <>
            <label className="block mb-1 font-medium">Placeholder</label>
            <input
              type="text"
              value={fieldData.placeholder || ""}
              placeholder="Placeholder text"
              onChange={(e) =>
                setFieldData({ ...fieldData, placeholder: e.target.value })
              }
              className="border p-2 w-full mb-3 rounded"
            />
          </>
        )}

        {["select", "checkbox", "radio"].includes(fieldData.Type) && (
          <>
            <label className="block mb-1 font-medium">
              Options (comma separated)
            </label>
            <input
              type="text"
              value={fieldData.options?.join(", ") || ""}
              placeholder="option1, option2, option3"
              onChange={(e) =>
                setFieldData({
                  ...fieldData,
                  options: e.target.value
                    .split(",")
                    .map((o) => o.trim())
                    .filter(Boolean),
                })
              }
              className="border p-2 w-full mb-3 rounded"
            />
          </>
        )}

        <div className="border-t pt-3 mt-3">
          <h4 className="font-semibold mb-2">Validation Rules</h4>

          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={fieldData.validations?.required || false}
              onChange={(e) =>
                setFieldData({
                  ...fieldData,
                  validations: {
                    ...fieldData.validations,
                    required: e.target.checked,
                  },
                })
              }
            />
            Required
          </label>

          {fieldData.Type === "number" && (
            <>
              <label className="block font-medium">Min Value</label>
              <input
                type="number"
                value={fieldData.validations?.min || ""}
                onChange={(e) =>
                  setFieldData({
                    ...fieldData,
                    validations: {
                      ...fieldData.validations,
                      min: e.target.value ? Number(e.target.value) : undefined,
                    },
                  })
                }
                className="border p-2 w-full mb-3 rounded"
              />

              <label className="block font-medium">Max Value</label>
              <input
                type="number"
                value={fieldData.validations?.max || ""}
                onChange={(e) =>
                  setFieldData({
                    ...fieldData,
                    validations: {
                      ...fieldData.validations,
                      max: e.target.value ? Number(e.target.value) : undefined,
                    },
                  })
                }
                className="border p-2 w-full mb-3 rounded"
              />
            </>
          )}

          {["text", "email", "password"].includes(fieldData.Type) && (
            <>
              <label className="block font-medium">Min Length</label>
              <input
                type="number"
                value={fieldData.validations?.minLength || ""}
                onChange={(e) =>
                  setFieldData({
                    ...fieldData,
                    validations: {
                      ...fieldData.validations,
                      minLength: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    },
                  })
                }
                className="border p-2 w-full mb-3 rounded"
              />

              <label className="block font-medium">Max Length</label>
              <input
                type="number"
                value={fieldData.validations?.maxLength || ""}
                onChange={(e) =>
                  setFieldData({
                    ...fieldData,
                    validations: {
                      ...fieldData.validations,
                      maxLength: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    },
                  })
                }
                className="border p-2 w-full mb-3 rounded"
              />
            </>
          )}

          {["text", "email", "password"].includes(fieldData.Type) && (
            <>
              <label className="block font-medium">Pattern (Regex)</label>
              <input
                type="text"
                value={fieldData?.validations?.pattern?.toString() || ""}
                placeholder="^[a-zA-Z0-9]{6,}$"
                onChange={(e) =>
                  setFieldData({
                    ...fieldData,
                    validations: {
                      ...fieldData.validations,
                      pattern: e.target.value
                        ? new RegExp(e.target.value)
                        : undefined,
                    },
                  })
                }
                className="border p-2 w-full mb-3 rounded"
              />
            </>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="border p-2 rounded hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="border p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
