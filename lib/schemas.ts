import { z } from "zod";
import { INDUSTRIES, LOCATIONS } from "./constants";

export const jobFiltersSchema = z.object({
  industry: z
    .enum([...INDUSTRIES.keys()], {
      message: "Invalid industry value. Please select a valid industry from the dropdown",
    })
    .optional(),
  jobGeo: z
    .enum([...LOCATIONS.keys()], {
      message: "Invalid location value. Please select a valid location from the dropdown",
    })
    .optional(),
});
