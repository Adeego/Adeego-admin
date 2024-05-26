import React, { useEffect } from "react";
import OrderStore from "../../../Store/OrderStore";

import "instantsearch.css/themes/algolia-min.css";
import {
  InstantSearch,
  connectSearchBox,
  connectInfiniteHits,
} from "react-instantsearch-dom";
import { Input } from "@/components/ui/input";

import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { Minus, Plus } from "lucide-react";
import { doc, getDoc, getFirestore } from "@firebase/firestore";
import app from "../../../../firebaseConfig";

//! SEARCH LOGIC

const { searchClient } = instantMeiliSearch(
  "https://abzagency.services/",
  "3f336861613e8e89111860d07113619f0abf8702acc78b15a0f6e7a04460a948",
  {
    meiliSearchParams: {
      attributesToHighlight: [
        "Name",
        "Category",
        "Keywords",
        "Size",
        "Description",
      ],
      attributesToSearchOn: [
        "Name",
        "Category",
        "Keywords",
        "Size",
        "Description",
      ],
    },
    placeholderSearch: false, // default: true.
    primaryKey: "_firestore_id", // default: undefined
  }
);

const SearchBar = ({ refine, currentRefinement }) => {
  return (
    <div className="w-full">
      <Input
        type="text"
        className="border-neutral-300 w-full rounded-[0.2rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 "
        onChange={(e) => refine(e.target.value)}
        value={currentRefinement}
        autoFocus
        placeholder="what are you looking for?"
      />
    </div>
  );
};

const CustomSearchBox = connectSearchBox(SearchBar);

const InfiniteHit = ({ hits }) => {
  const { items, addItem, clearItems } = OrderStore();

  const handleErase = () => {
    clearItems();
  };

  const handleAddItems = (item) => {
    if (item.Stock === "Out of stock") {
      console.log("This item is Out of stock");
      return null;
    } else {
      // Assuming itemsArray is available and contains the list of current items
      const existingItem = items.find(
        (existingItem) => existingItem.ProductId === item._firestore_id
      );

      if (existingItem) {
        // If the item is already in the array, increment the quantity
        existingItem.Quantity += 1;
      } else {
        // If the item is not in the array, add a new item with quantity 1
        const newItem = {
          ProductId: `${item._firestore_id}`,
          Quantity: 1,
        };
        addItem(newItem);
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-2">
      {hits.length > 0 ? (
        <div className="grid grid-cols-1 custom_scrollbar gap-2 w-full max-h-96 overflow-scroll pr-2">
          {hits.map((item) => (
            <div
              key={item._firestore_id}
              className="flex flex-row justify-between items-center p-2 rounded-[0.3rem] w-full gap-4 border border-neutral-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.Image}
                  alt={item.Name}
                  className="size-12 object-cover rounded-[0.3rem]"
                />
                <div className="leading-0 text-sm flex flex-col gap-2">
                  <p className="text-sm font-">
                    {item.Name} {item.Size}
                  </p>

                  <div className="flex justify-between items-center  rounded-md w-full">
                    <p className="text-xs font-semibold">Ksh {item.Price}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddItems(item);
                }}
                className={`${
                  item.Stock === "Out of stock"
                    ? "bg-red-500 !cursor-not-allowed"
                    : "bg-black cursor-pointer"
                } rounded-full size-6 shrink-0 grid place-items-center`}
              >
                <Plus size={16} strokeWidth={3} stroke="white" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-4 text-sm">No items found</p>
      )}
    </div>
  );
};

const CustomInfiniteHits = connectInfiniteHits(InfiniteHit);

const Search = () => (
  <div className="w-full">
    <InstantSearch indexName="adeego" searchClient={searchClient}>
      <CustomSearchBox />
      <CustomInfiniteHits />
    </InstantSearch>
  </div>
);

const Hit = ({ hit }) => (
  <div
    key={hit._firestore_id}
    // onClick={() => history.push(`/product/${hit._firestore_id}`)}
    className="items-center bg-gray-100 p-2 rounded-lg shadow-lg w-[300px]"
  >
    {/* <img
      src={hit.Image}
      alt={hit.Name}
      className="w-full h-40 object-cover rounded-lg"
    /> */}
    <div className="flex flex-col items-start w-full">
      <p className="text-black text-sm w-full truncate">
        {hit.Name} {hit.Size}
      </p>
      <p className="text-gray-600 text-xs">{hit.Stock}</p>
      <div className="flex justify-center items-center bg-green-300 p-1 h-7 rounded-md mt-2 mb-1 w-full">
        <p className="text-green-700 text-sm font-bold">Ksh {hit.Price}</p>
      </div>
    </div>
  </div>
);


//! ORDERLIST

const OrderList = () => {
  const { items, itemList, setItemList, removeItem } = OrderStore();

  useEffect(() => {
    // Function to fetch product documents from Firestore
    const fetchProducts = async (itemsId) => {
      try {
        const db = getFirestore(app);
        const productDocs = await Promise.all(
          itemsId.map(async (product) => {
            const ProductId = product.ProductId;
            const Quantity = product.Quantity;
            const productRef = doc(db, "Products", ProductId);
            const productDoc = await getDoc(productRef);

            if (productDoc.exists()) {
              return { id: ProductId, Quantity, ...productDoc.data() };
            } else {
              return null;
            }
          })
        );

        // Filter out any null results and set the state
        setItemList(productDocs.filter((doc) => doc !== null));
      } catch (error) {
        console.error(error);
        // Replace with your error handling logic
        console.log("Error fetching product documents");
      }
    };

    if (items && items.length > 0) {
      fetchProducts(items);
    }
  }, [items, setItemList]);

  const handleRemoveItem = (id) => {
    const itemIndex = itemList.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      console.log(`Item with ID ${id} not found in itemList.`);
      return;
    }

    const item = itemList[itemIndex];

    if (item.Quantity > 1) {
      item.Quantity -= 1;
      // Update the item list directly (assuming in-place modification is allowed)
      itemList[itemIndex] = item;
    } else {
      const remove = {
        ProductId: id,
      };
      removeItem(remove);
      setItemList(itemList.filter((item) => item.id !== id));
    }
  };
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="text-sm font-medium">
        <h1>Selected Products</h1>
      </div>
      <div className="flex flex-col gap-3">
        {itemList.map((item) => (
          <div
            key={item.id}
            className="flex flex-row justify-between items-center p-2 rounded-[0.3rem] w-full  gap-4 border border-neutral-300"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.Image}
                alt={item.Name}
                className="size-12 object-cover rounded-[0.3rem]"
              />
              <div className="leading-0 text-sm flex flex-col gap-1">
                <p className="text-sm font-">
                  {item.Name} {item.Size}{" "}
                  <span className="font-semibold">x {item.Quantity}</span>
                </p>

                <div className="flex justify-between items-center  rounded-md w-full">
                  <p className="text-xs font-semibold">Ksh {item.Price}</p>
                </div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRemoveItem(item.id);
              }}
              className={`bg-black rounded-full size-6 shrink-0 grid place-items-center`}
            >
              <Minus size={16} color="#F2F2F2" />
            
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


function CreateOrderComp() {
  return (
    <div className="grid grid-cols-2 h-full w-full border border-neutral-200 divide-x divide-neutral-200 rounded-[0.2rem]">
      <div className="w-full flex justify-center p-2">
        <Search />
      </div>
      <div className="w-full">
        <OrderList />
      </div>
    </div>
  );
}

export default CreateOrderComp;
