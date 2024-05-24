import React, { useState, useEffect } from "react";
import OrderStore from "../../../Store/OrderStore";
import app from "../../../../firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { HiOutlineMinus } from "react-icons/hi";

function OrderList() {
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
        // Replace with your error handling logic
        console.log("Error fetching product documents");
      }
    };

    if (items && items.length > 0) {
      fetchProducts(items);
    }
  }, [items, setItemList]);

  const handleRemoveItem = (id) => {
    const remove = {
      ProductId: id,
    };
    removeItem(remove);
    // Update itemList after removing the item
    setItemList(itemList.filter((item) => item.id !== id));
  };

  console.log(itemList);
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
                  {item.Name} {item.Size} <span className="font-semibold">x {item.Quantity}</span>
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
              <HiOutlineMinus size={16} color="#F2F2F2" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;
