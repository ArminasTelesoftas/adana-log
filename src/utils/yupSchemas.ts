import * as yup from "yup";

export const yupHoursSchema = yup
  .number()
  .positive("Must be positive")
  .nullable(true)
  .transform((v) => (v === "" || isNaN(v) ? null : v));

export const timeEntrySchema = yup.object().shape({
  hours: yupHoursSchema,
});
