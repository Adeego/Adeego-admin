import "instantsearch.css/themes/algolia-min.css";
import React, { useState } from "react";
import {
  InstantSearch,
  connectSearchBox,
  connectInfiniteHits,
} from "react-instantsearch-dom";
import OrderStore from "../../../Store/OrderStore";
import { Input } from "@/components/ui/input";

import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { Plus } from "lucide-react";

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

export default Search;
