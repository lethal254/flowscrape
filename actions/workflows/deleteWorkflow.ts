"use server"

import prisma from "@/lib/prisma"
import {
  deleteWorkflowSchema,
  deleteWorkflowSchemaType,
} from "@/schema/workflow"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function DeleteWorkflow(workflowId: deleteWorkflowSchemaType) {
  const { success, data } = deleteWorkflowSchema.safeParse(workflowId)
  if (!success) {
    throw new Error("Invalid form data")
  }
  const { userId } = auth()

  if (!userId) {
    throw new Error("unauthenticated")
  }
  const result = await prisma.workflow.delete({
    where: { id: data, userId },
  })
  if (!result) {
    throw new Error("Failed to create workflow")
  }

  revalidatePath("/workflows")
}
