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
import EditForm from "./EditForm";

const LgEditForm = ({ order }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className='w-full'>
      <button className="gap-2 items-center text-xs md:text-sm hover:!bg-neutral-200/60 transition !cursor-pointer p-1.5 px-2 rounded-[0.3rem] w-full text-left">
          Edit Order
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white !rounded-[0.5rem]">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Order?</AlertDialogTitle>
          <AlertDialogDescription>
            Make changes to your order here. Click save when you're done.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <EditForm order={order} />
        <AlertDialogFooter>
          <AlertDialogCancel className="border border-neutral-300 rounded-[0.3rem]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-black text-white rounded-[0.3rem]">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LgEditForm;
