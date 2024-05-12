import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categoryOptions = [
  { value: "DryFoods", label: "Dry Foods" },
  { value: "OilButter", label: "Oil & Butter" },
  { value: "OtherFoods", label: "Other Foods" },
  { value: "BabyCare", label: "Baby Care" },
  { value: "PersonalCare", label: "Personal Care" },
  { value: "Cleaning", label: "Cleaning" },
  { value: "OtherEssentials", label: "Other Essentials" },
];

const EditForm = ({ product, productFxns }) => {
  return (
    <form action="" className="p-2 px-4 md:px-0 flex flex-col gap-4">
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="userId"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Name
        </Label>
        <Input
          type="text"
          id="name"
          value={product.name}
          onChange={() => {}}
          placeholder="Name"
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="description"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Description
        </Label>
        <Textarea
          id="name"
          value={product.description}
          onChange={() => {}}
          placeholder="Description"
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="b_price"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Buying price
        </Label>
        <Input
          type="number"
          id="b_price"
          value={product.buyPrice}
          onChange={() => {}}
          placeholder="Buying Price"
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="price"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Price
        </Label>
        <Input
          type="number"
          id="price"
          value={product.price}
          onChange={() => {}}
          placeholder="Price"
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="price"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Quantity
        </Label>
        <Input
          type="number"
          id="size"
          value={product.size}
          onChange={() => {}}
          placeholder="Quantity"
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="orderStatus"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Category
        </Label>
        <Select>
          <SelectTrigger className="w-full text-xs  md:text-sm border-neutra-200 rounded-[0.3rem] focus:border-neutral-600">
            <SelectValue placeholder={`${product.category}`} />
          </SelectTrigger>
          <SelectContent className=" bg-white rounded-[0.3rem]">
            {categoryOptions.map((option) => (
              <SelectItem
                key={option.value}
                className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </form>
  );
};

export default EditForm;
