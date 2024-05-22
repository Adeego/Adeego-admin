import React, { useState, useEffect } from 'react';
import OrderStore from '../../../Store/OrderStore';
import app from '../../../../firebaseConfig';
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
            const productRef = doc(db, 'Products', ProductId);
            const productDoc = await getDoc(productRef);

            if (productDoc.exists()) {
              return { id: ProductId, ...productDoc.data() };
            } else {
              return null;
            }
          })
        );

        // Filter out any null results and set the state
        setItemList(productDocs.filter(doc => doc !== null));
      } catch (error) {
        // Replace with your error handling logic
        console.log('Error fetching product documents');
      }
    };

    if (items && items.length > 0) {
      fetchProducts(items);
    }
  }, [items, setItemList]);

  const handleRemoveItem = (id) => {
    const remove = {
      ProductId: id
    }
    removeItem(remove);
    // Update itemList after removing the item
    setItemList(itemList.filter(item => item.id !== id));
  }

  return (
    <div className=' justify-center'>
        <div className=' justify-center' >
            <h1>Order Products</h1>
        </div>

      {itemList.map((item) => (
            <div
              key={item.id}
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
                  <button onClick={() => handleRemoveItem(item.id)} className="bg-black rounded-full">
                    <HiOutlineMinus size={24} color='#F2F2F2'/>
                  </button>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}

export default OrderList;


