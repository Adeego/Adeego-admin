import "instantsearch.css/themes/algolia-min.css";
import React, { useState } from "react";
import {
  InstantSearch, connectSearchBox, connectInfiniteHits
} from "react-instantsearch-dom";
import OrderStore from "../../Store/OrderStore";
import { IoAdd } from "react-icons/io5";

import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const { searchClient } = instantMeiliSearch(
    'https://abzagency.services/',
    '3f336861613e8e89111860d07113619f0abf8702acc78b15a0f6e7a04460a948',
    {
      meiliSearchParams: {
        attributesToHighlight: ['Name', 'Category', 'Keywords', 'Size', 'Description'],
        attributesToSearchOn: ['Name', 'Category', 'Keywords', 'Size', 'Description'],
      },
        placeholderSearch: false, // default: true.
        primaryKey: '_firestore_id', // default: undefined
      }
    );

    const SearchBar = ({ refine, currentRefinement }) => {
      
        return (
          <div className="flex flex-col items-center bg-green-700 w-full h-18 p-2 rounded-lg">
            <div className="flex bg-white/30 w-11/12 h-10 rounded-md p-1 mt-1">
              <input
                type="text"
                className="text-white text-lg w-11/12 h-full font-semibold bg-transparent outline-none"
                onChange={(e) => refine(e.target.value)}
                value={currentRefinement}
                autoFocus
                placeholder="what are you looking for?"
              />
            </div>
          </div>
        );
      };
      
      const CustomSearchBox = connectSearchBox(SearchBar);


const InfiniteHit = ({ hits }) => {
  const { items, addItem, clearItems } = OrderStore();

  const handleErase = () => {
    clearItems();
  }

  const handleAddItems = (item) => {
    if (item.Stock === 'Out of stock') {
        console.log('This item is Out of stock')
        return null
    } else {
        const id = {
            ProductId: `${item._firestore_id}`
        }
        addItem(id);
    }
  };

  return (
    <div className="flex flex-col items-center w-11/12 bg-gray-200 mt-2 mb-5">
      {hits.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 w-full">
          {hits.map((item) => (
            <div
              key={item._firestore_id}
              className="flex flex-row items-center bg-gray-100 p-2 rounded-lg shadow-lg w-full h-[85px]"
            >
              <img
                src={item.Image}
                alt={item.Name}
                className="w-[80px] h-[80px] object-cover rounded-lg"
              />
              <div className="flex flex-col items-start w-full ml-3">
                <p className="text-black text-sm font-semibold truncate w-full">
                  {item.Name} {item.Size}
                </p>
                <p className="text-gray-600 text-xs">{item.Stock}</p>
                <div className="flex justify-between items-center p-1 h-7 rounded-md mt-2 mb-1 w-full">
                  <p className="text-green-700 text-sm font-bold">Ksh {item.Price}</p>
                  <button onClick={() => handleAddItems(item)} className="bg-black rounded-full">
                    <IoAdd size={24} color="#F2F2F2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-lg font-bold text-gray-600 mt-30">No items found</p>
        </div>
      )}
    </div>
  );
};

      
      const CustomInfiniteHits = connectInfiniteHits(InfiniteHit);

const Search = () => (
  <div className="ais-InstantSearch">
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
      <p className="text-black text-sm font-semibold w-full truncate">
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
