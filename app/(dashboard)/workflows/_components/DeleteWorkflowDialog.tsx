"use client"

import { DeleteWorkflow } from "@/actions/workflows/deleteWorkflow"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { deleteWorkflowSchemaType } from "@/schema/workflow"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useCallback, useState } from "react"
import { toast } from "sonner"

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  workflowName: string
  workflowId: string
}

const DeleteWorkflowDialog = ({
  open,
  setOpen,
  workflowName,
  workflowId,
}: Props) => {
  const [confirmText, setConfirmText] = useState("")

  const { mutate, isPending } = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted", { id: workflowId })
      setConfirmText("")
    },
    onError: () => {
      toast.error("Failed to delete workflow", { id: workflowId })
    },
  })

  const onDelete = useCallback(
    (workflowId: deleteWorkflowSchemaType) => {
      toast.loading("Deleting workflow...", { id: workflowId })

      mutate(workflowId)
    },
    [mutate]
  )
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this workflow you will not be able to receover it
            <div className='flex flex-col py-4 gap-2'>
              <p>
                If you are sure , enter <b>{workflowName}</b>{" "}
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== workflowName || isPending}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90  '
            onClick={() => onDelete(workflowId)}>
            {!isPending && "Delete"}
            {isPending && <Loader2 className='animate-spin' />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteWorkflowDialog
