import { useFormBuilder } from "../../store/useFormBuilder";
import FieldBox from "./FieldBox";

export default function FormBuilderView() {
  const form = useFormBuilder((s) => s.form);

  if (!form?.row || form.row.length === 0) {
    return <div className="text-gray-500">No fields added yet</div>;
  }

  return (
    <form className="flex flex-col gap-6 w-full">
      {form.row
        .sort((a, b) => a.row_index - b.row_index)
        .map((row) => (
          <div key={row.row_index} className="grid grid-cols-2 gap-6">
            {row.col
              .sort((a, b) => a.col_index - b.col_index)
              .map((col, col_index) => (
                <div className="flex flex-row" key={col.col_index}>
                  <FieldBox
                    labelname={col.field.label ?? ""}
                    row_index={row.row_index}
                    count={row.col.length}
                    col_index={col_index}
                    col_values={col}
                  />
                </div>
              ))}
          </div>
        ))}
    </form>
  );
}
