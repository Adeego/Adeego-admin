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
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditForm from "./EditForm";

const LgEditForm = ({ order, editOrderFxns, handleApplyChanges }) => {
  return (
    <AlertDialog className="">
      <AlertDialogTrigger className="w-full">
        <button className="gap-2 items-center text-xs md:text-sm hover:!bg-neutral-200/60 transition !cursor-pointer p-1.5 px-2 rounded-[0.3rem] w-full text-left">
          Edit Order
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white !rounded-[0.5rem]">
        <ScrollArea className="!max-h-[90vh]">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Order?</AlertDialogTitle>
            <AlertDialogDescription>
              Make changes to your order here. Click save when you're done.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <EditForm order={order} editOrderFxns={editOrderFxns} />
          <AlertDialogFooter className="">
            <AlertDialogCancel className="max-w-fit !p-0 border-none">
              <button className="p-2 px-6 border border-neutral-300 rounded-[0.3rem] text-neutral-900">
                cancel
              </button>
            </AlertDialogCancel>
            <AlertDialogAction className="!p-0">
              <button
                onClick={handleApplyChanges}
                className="p-2 px-6 bg-black text-white  rounded-[0.3rem]"
              >
                confirm
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LgEditForm;
