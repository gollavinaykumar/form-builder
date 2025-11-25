import { useFormBuilder } from "../../store/useFormBuilder";
import { useSubmitForm } from "../hooks/formquery";
import FieldRenderer from "./FieldRender";

export default function DynamicForm() {
  const form = useFormBuilder((s) => s.form);
  const onSubmit = useFormBuilder((s) => s.onSubmit);
  const mutation = useSubmitForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values: Record<string, unknown> = {};

    for (const [key, value] of formData.entries()) {
      if (values[key]) {
        if (Array.isArray(values[key])) {
          values[key].push(value);
        } else {
          values[key] = [values[key], value];
        }
      } else {
        values[key] = value;
      }
    }
    onSubmit(values);
    mutation.mutate(values);

    console.log(values);
  };

  return (
    <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
      {form.row
        .sort((a, b) => a.row_index - b.row_index)
        .map((row) => {
          const colCount = row.col.length || 1;
          return (
            <div
              key={row.row_index}
              className="grid gap-6 grid-cols-1 md:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              style={{ ["--cols" as any]: colCount }}
            >
              {row.col
                .sort((a, b) => a.col_index - b.col_index)
                .map((col) => (
                  <FieldRenderer key={col.col_index} field={col.field} />
                ))}
            </div>
          );
        })}
    </form>
  );
}
