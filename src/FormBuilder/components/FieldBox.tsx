import { useState } from "react";
import type { Col, Field } from "../../interfaces/Form";
import { useFormBuilder } from "../../store/useFormBuilder";
import EditForm from "../utils/EditForm";

export default function FieldBox({
  labelname,
  count,
  row_index,
  col_index,
  col_values,
}: {
  labelname: string;
  count: number;
  row_index: number;
  col_index: number;
  col_values: Col;
}) {
  const setOpenModal = useFormBuilder((s) => s.setOpenModal);
  const setCurrentRow = useFormBuilder((s) => s.setCurrentEditingRowIndex);
  const editField = useFormBuilder((s) => s.editField);
  const deleteField = useFormBuilder((s) => s.deleteField);
  const ondragEnd = useFormBuilder((s) => s.ondragEnd);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldData, setFieldData] = useState<Field>(col_values.field);

  const handleEdit = () => {
    setFieldData(col_values.field);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    deleteField(row_index, col_index);
  };
  const handleSave = () => {
    console.log("Saving:", fieldData);
    editField(row_index, col_index, fieldData);
    setIsModalOpen(false);
  };

  function dragstartHandler(
    e: React.DragEvent<HTMLDivElement>,
    row_index: number,
    col_index: number
  ) {
    const payload = { fromRow: row_index, fromCol: col_index };
    console.log("payload : ", payload);
    try {
      e.dataTransfer.setData("application/json", JSON.stringify(payload));
    } catch (err) {
      e.dataTransfer.setData("text/plain", JSON.stringify(payload));
    }
    try {
      e.dataTransfer.effectAllowed = "move";
    } catch (err) {}
  }
  function dragoverHandler(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  function dropHandler(
    e: React.DragEvent<HTMLDivElement>,
    to_row_index: number,
    to_col_index: number
  ) {
    e.preventDefault();

    let raw = "";
    try {
      raw = e.dataTransfer.getData("application/json");
    } catch {}

    if (!raw) {
      try {
        raw = e.dataTransfer.getData("text/plain");
      } catch {}
    }

    if (!raw) return;

    let payload: { fromRow: number; fromCol: number } | null = null;

    try {
      payload = JSON.parse(raw);
    } catch {
      return;
    }

    if (!payload) return;

    const { fromRow, fromCol } = payload;

    console.log("DROP FROM:", fromRow, fromCol);
    console.log("DROP TO:", to_row_index, to_col_index);

    ondragEnd(fromRow, fromCol, to_row_index, to_col_index);
  }

  return (
    <div
      className="border rounded p-2 flex flex-col gap-2 group bg-gray-50"
      draggable="true"
      onDragStart={(e) => dragstartHandler(e, row_index, col_index)}
      onDragOver={dragoverHandler}
      onDrop={(e) => dropHandler(e, row_index, col_index)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold">
            {labelname || fieldData.label || fieldData.name}
          </h4>
          <p className="text-sm text-gray-500">
            Type: <span className="font-medium">{fieldData.Type}</span>
            {fieldData.options && fieldData.options.length > 0 && (
              <> | Options: {fieldData.options.join(", ")}</>
            )}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <button
            className="border p-1 px-2 rounded hover:bg-gray-200"
            title="Edit Field"
            onClick={handleEdit}
          >
            edit
          </button>
          <button
            className="border p-1 px-2 rounded hover:bg-red-200"
            title="Delete Field"
            onClick={handleDelete}
          >
            del
          </button>
          {count < 2 && (
            <button
              className="hidden group-hover:inline border p-1 px-2 rounded hover:bg-green-200"
              title="Add another field in this row"
              onClick={() => {
                setCurrentRow(row_index);
                setOpenModal(true);
              }}
            >
              +
            </button>
          )}
        </div>
      </div>
      {isModalOpen && (
        <EditForm
          fieldData={fieldData}
          setFieldData={setFieldData}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
