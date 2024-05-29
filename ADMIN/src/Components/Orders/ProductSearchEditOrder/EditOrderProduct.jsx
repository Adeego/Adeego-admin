import React, { useEffect, useState } from "react";
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

const InfiniteHit = ({ hits, items, addItem }) => {
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
                  addItem(item);
                  console.log(items);
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

const Search = ({ items, addItem }) => (
  <div className="w-full">
    <InstantSearch indexName="adeego" searchClient={searchClient}>
      <CustomSearchBox />
      <CustomInfiniteHits items={items} addItem={addItem} />
    </InstantSearch>
  </div>
);

function EditOrderProduct({ addItem }) {
  const [items, setItems] = useState([]);

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
        // Replace with your error handling logic
      }
    };

    if (items && items.length > 0) {
      fetchProducts(items);
    }
  }, []);


  return (
    <div className="h-full w-full border border-neutral-200 divide-x divide-neutral-200 rounded-[0.2rem]">
      <div className="w-full flex justify-center p-2">
        <Search items={items} addItem={addItem} />
      </div>
    </div>
  );
}

export default EditOrderProduct;
