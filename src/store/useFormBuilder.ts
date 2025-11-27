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

  // ondragStart: (row_index: number, col_index: number) => void;

  ondragEnd: (
    from_row_index: number,
    from_col_index: number,
    to_row_index: number,
    to_col_index: number
  ) => void;

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

  ondragEnd: (from_row_index, from_col_index, to_row_index, to_col_index) => {
    const form = get().form;
    if (!form) return;

    const rows = form.row.map((r) => ({
      ...r,
      col: r.col.map((c) => ({ ...c })),
    }));

    if (
      !Number.isInteger(from_row_index) ||
      !Number.isInteger(from_col_index) ||
      !Number.isInteger(to_row_index) ||
      !Number.isInteger(to_col_index)
    ) {
      return;
    }

    if (!rows[from_row_index] || !rows[to_row_index]) return;

    const fromRow = rows[from_row_index];

    const toRow = rows[to_row_index];

    if (from_col_index < 0 || from_col_index >= fromRow.col.length) return;
    if (to_col_index < 0 || to_col_index >= toRow.col.length) return;

    const fromField = fromRow.col[from_col_index].field;
    const toField = toRow.col[to_col_index].field;

    fromRow.col[from_col_index] = {
      ...fromRow.col[from_col_index],
      field: toField,
    };
    toRow.col[to_col_index] = { ...toRow.col[to_col_index], field: fromField };

    rows.forEach((r, ri) => {
      r.row_index = ri;
      r.col = r.col.map((c, ci) => ({ col_index: ci, field: c.field }));
    });

    const updatedForm = { ...form, row: rows };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedForm));
    set({ form: updatedForm });
  },

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
