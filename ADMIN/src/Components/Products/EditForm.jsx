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
  const {
    updateName,
    updateCategory,
    updateStock,
    updateSize,
    updateBuyPrice,
    updatePrice,
    updateImage,
    updateDescription,
    updateKeywords,
  } = productFxns;
  const {
    name,
    category,
    stock,
    size,
    buyPrice,
    price,
    image,
    description,
    keywords,
  } = product;
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
          value={name}
          onChange={(e) => {
            updateName(e.target.value);
          }}
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
          value={description}
          onChange={(e) => {
            updateDescription(e.target.value);
          }}
          placeholder="Description"
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label className="font-medium text-xs md:text-sm select-none pointer-events-none">
          Availability
        </Label>
        <Select onValueChange={(value) => updateStock(value)}>
          <SelectTrigger className="w-full text-xs  md:text-sm border-neutra-200 rounded-[0.3rem] focus:border-neutral-600">
            <SelectValue placeholder={`${stock}`} />
          </SelectTrigger>
          <SelectContent className=" bg-white rounded-[0.3rem]">
            <SelectItem
              className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
              value="In stock"
            >
              In stock
            </SelectItem>
            <SelectItem
              className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
              value="Out of stock"
            >
              Out of stock{" "}
            </SelectItem>
          </SelectContent>
        </Select>
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
          value={buyPrice}
          onChange={(e) => {
            updateBuyPrice(e.target.value);
          }}
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
          value={price}
          onChange={(e) => {
            updatePrice(e.target.value);
          }}
          placeholder="Price"
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="size"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Quantity
        </Label>
        <Input
          type="text"
          id="size"
          value={size}
          onChange={(e) => {
            updateSize(e.target.value);
          }}
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
        <Select onValueChange={(value) => updateCategory(value)}>
          <SelectTrigger className="w-full text-xs  md:text-sm border-neutra-200 rounded-[0.3rem] focus:border-neutral-600">
            <SelectValue placeholder={`${category}`} />
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
