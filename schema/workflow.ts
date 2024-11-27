import { z } from "zod"

export const createWorkflowSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(80).optional(),
})

export const deleteWorkflowSchema = z.string()

export type createWorkflowSchemaType = z.infer<typeof createWorkflowSchema>
export type deleteWorkflowSchemaType = z.infer<typeof deleteWorkflowSchema>
