import { useFormBuilder } from "../store/useFormBuilder";
import ComponentsModal from "./components/componentsModal";
import FieldBox from "./components/FieldBox";

export default function Builder() {
  const form = useFormBuilder((s) => s.form);
  const isOpenModal = useFormBuilder((s) => s.isOpenmodal);
  const setOpenModal = useFormBuilder((s) => s.setOpenModal);
  const setCurrentRow = useFormBuilder((s) => s.setCurrentEditingRowIndex);
  const currentRowIndex = useFormBuilder((s) => s.currentEditingRowIndex);

  const handleAddField = (rowIndex: number) => {
    setCurrentRow(rowIndex);
    setOpenModal(true);
  };

  return (
    <div className="text-center">
      {form?.row.length === 0 ? (
        <button
          onClick={() => handleAddField(0)}
          className="p-4 ml-5 mr-5 border cursor-pointer hover:bg-black hover:text-white transition"
        >
          + Add Field
        </button>
      ) : (
        form.row
          .sort((a, b) => a.row_index - b.row_index)
          .map((row) => (
            <>
              <div key={row.row_index} className="grid grid-cols-2 gap-6">
                {row.col.map((col, col_index) => (
                  <FieldBox
                    key={col.col_index}
                    labelname={col.field.label ?? ""}
                    count={row.col.length}
                    row_index={row.row_index}
                    col_index={col_index}
                    col_values={col}
                  />
                ))}
              </div>
            </>
          ))
      )}

      {form.row.length > 0 && (
        <button
          onClick={() => handleAddField(form.row.length)}
          className="p-4 ml-5 mr-5 bg-blue-600 border cursor-pointer hover:bg-black text-white transition mt-50"
        >
          + Add Field
        </button>
      )}

      {isOpenModal && (
        <ComponentsModal
          isOpen={isOpenModal}
          setOpen={setOpenModal}
          row_index={currentRowIndex}
        />
      )}
    </div>
  );
}
