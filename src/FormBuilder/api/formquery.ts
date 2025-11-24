import { useMutation } from "@tanstack/react-query";

export function useSubmitForm() {
  return useMutation({
    mutationFn: async (values: unknown) => {
      const res = await fetch("http://localhost:8080/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      return res.json();
    },
  });
}
