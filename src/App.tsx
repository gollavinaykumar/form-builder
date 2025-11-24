import "./App.css";
import Builder from "./FormBuilder/Builder";
import DynamicForm from "./FormBuilder/components/FormRender";

import { useFormBuilder } from "./store/useFormBuilder";

export default function App() {
  const setForm = useFormBuilder((s) => s.setForm);

  const handleDeleteForm = () => {
    localStorage.removeItem("my_form");
    setForm({ row: [] });
  };

  return (
    <section className="flex gap-4 p-4 border">
      <section className="flex-1 border p-4 rounded h-150">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Build Here</h2>
          <button
            onClick={handleDeleteForm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete Form
          </button>
        </div>
        <Builder />
      </section>

      <section className="flex-1 border p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        <DynamicForm />
      </section>
    </section>
  );
}
