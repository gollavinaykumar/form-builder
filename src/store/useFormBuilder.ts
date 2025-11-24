import { create } from "zustand";
import type { Form, Field } from "../interfaces/Form";
import { defaultForm } from "../FormBuilder/utils/sampleform";

interface FormStore {
  form: Form;
  setForm: (form: Form) => void;
  submittedValues: unknown | null;
  onSubmit: (values: unknown) => void;

  isOpenmodal: boolean;
  setOpenModal: (val: boolean) => void;

  currentEditingRowIndex: number;
  setCurrentEditingRowIndex: (num: number) => void;

  registerField: (row_index: number, field: Field) => void;
  editField: (
    row_index: number,
    col_index: number,
    updatedField: Field
  ) => void;
  deleteField: (row_index: number, col_index: number) => void;
}

const LOCAL_STORAGE_KEY = "my_form";

export const useFormBuilder = create<FormStore>((set, get) => ({
  form:
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "null") ||
    defaultForm,

  setForm: (form) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(form));
    set({ form });
  },
  submittedValues: {},
  onSubmit: (values: unknown) => {
    set({
      submittedValues: values,
    });
  },
  isOpenmodal: false,
  setOpenModal: (val) => set({ isOpenmodal: val }),

  currentEditingRowIndex: 0,
  setCurrentEditingRowIndex: (num) => set({ currentEditingRowIndex: num }),
  registerField: (row_index, field) => {
    const form = get().form;
    if (!form) return;

    const updatedRows = [...form.row];

    if (!updatedRows[row_index]) {
      updatedRows[row_index] = { row_index, col: [] };
    }

    const formAlreadyHasButton = updatedRows.some((row) =>
      row.col.some((c) => c.field?.HtmlTag === "button")
    );

    if (field.HtmlTag === "button" && formAlreadyHasButton) {
      alert("Only one button is allowed in the entire form");
      return;
    }

    updatedRows[row_index] = {
      ...updatedRows[row_index],
      col: [
        ...updatedRows[row_index].col,
        { col_index: updatedRows[row_index].col.length, field },
      ],
    };

    const updatedForm = { ...form, row: updatedRows };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedForm));
    set({ form: updatedForm });
  },
  editField: (row_index, col_index, updatedField) => {
    const form = get().form;
    if (!form) return;

    const updatedRows = [...form.row];
    const row = updatedRows[row_index];
    if (!row) return;

    row.col[col_index] = { col_index, field: updatedField };

    const updatedForm = { ...form, row: updatedRows };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedForm));
    set({ form: updatedForm });
  },

  deleteField: (row_index, col_index) => {
    const form = get().form;
    if (!form) return;

    const updatedRows = [...form.row];
    const row = updatedRows[row_index];
    if (!row) return;

    row.col = row.col.filter((_, i) => i !== col_index);

    row.col = row.col.map((c, i) => ({ ...c, col_index: i }));

    const updatedForm = { ...form, row: updatedRows };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedForm));
    set({ form: updatedForm });
  },
}));
