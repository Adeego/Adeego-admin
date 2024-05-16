import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditForm = ({ agent, editAgentFxns }) => {
  const { id, FullName, Code, Occupation, Referred, Wallet } = agent;

  const {
    updateUserId,
    updateFullName,
    updateCode,
    updateOccupation,
    updateReferred,
    updateWallet,
  } = editAgentFxns;

  return (
    <form action="" className="p-2 px-4 md:px-0 flex flex-col gap-4">
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="userId"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          User ID
        </Label>
        <Input
          type="text"
          id="userId"
          value={id}
          placeholder="User Id"
          onChange={(e) => updateUserId(e.target.value)}
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="items"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Full Name
        </Label>
        <Input
          type="text"
          id="fullName"
          value={FullName}
          onChange={(e) => updateFullName(e.target.value)}
          placeholder="Full Name"
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm placeholder:text-neutral-500 w-full focus:border-neutral-600"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="code"
          className="font-medium text-xs md:text-sm  select-none pointer-events-none"
        >
          Agent Code
        </Label>
        <Input
          type="text"
          value={Code}
          onChange={(e) => updateCode(e.target.value)}
          id="code"
          placeholder="Agent Code"
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm placeholder:text-neutral-500 w-full focus:border-neutral-600"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="occupation"
          className="font-medium text-xs md:text-sm  select-none pointer-events-none"
        >
          Agent Occupation
        </Label>
        <Input
          type="text"
          value={Occupation}
          onChange={(e) => updateOccupation(e.target.value)}
          id="occupation"
          placeholder="Agent Occupation"
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm placeholder:text-neutral-500 w-full focus:border-neutral-600"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="Wallet"
          className="font-medium text-xs md:text-sm  select-none pointer-events-none"
        >
          Wallet
        </Label>
        <Input
          type="text"
          value={Wallet}
          onChange={(e) => updateWallet(e.target.value)}
          id="code"
          placeholder="Wallet"
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm placeholder:text-neutral-500 w-full focus:border-neutral-600"
        />
      </div>
    </form>
  );
};

export default EditForm;
