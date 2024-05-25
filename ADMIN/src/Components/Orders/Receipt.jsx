import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { useReactToPrint } from 'react-to-print';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../../../firebaseConfig';
import icon from '../../Assets/icon.png'

export default function Receipt({handleReceiptFalse, orderData }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPrinting, setIsPrinting] = useState(false);
  const [userId, setUserId] = useState(orderData.UserId)
  const [customer, setCustomer] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState(0)
  const [addressId, setAddressId] = useState([])
  const [area, setArea] = useState('')
  const [estate, setEstate] = useState('')
  const [house, setHouse] = useState('')
  const [items, setItems] = useState(orderData.Items)
  const [total, setTotal] = useState(orderData.TotalAmount)
  const componentRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Order Receipt',
    onBeforeGetContent: () => setIsPrinting(true),
    onAfterGetContent: () => setIsPrinting(false),
  });

  async function getData(collectionName, userId) {
    try {
      const db = getFirestore(app);
      const userRef = doc(db, collectionName, userId);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists) {
        return userSnap.data();
      } else {
        // Handle the case where user data is not found
        console.warn(`${collectionName} data not found for user:`, userId);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
}

useEffect(() => {
    const fetchData = async () => {
      const data = await getData("User", userId);
      setCustomer(data);
      setFirstName(data.FirstName)
      setLastName(data.LastName)
      setPhone(data.Phone)
      setAddressId(data.AddressId)
    };

    fetchData();
}, [userId]);

useEffect(() => {
    const fetchAddress = async () => {
        if (addressId === null) {
            return
        } else {
            const data = await getData("Address", addressId);
            setArea(data.Area)
            setEstate(data.Estate)
            setHouse(data.HouseNo)
        }
    };

    fetchAddress();
}, [addressId]);

  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontSize: 16,
      lineHeight: 1.5,
    },
    header: {
      display: 'flex',
      justifyContent: 'spaceBetween',
      marginBottom: 20,
    },
    spaceCont: {
      height: 50,
      width: 500
    },
    space: {
      height: 30,
      width: 400
    },
    logo: {
      width: 100,
      height: 100, // Adjust logo size as needed
      borderRadius: 10
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    orderDetails: {
      marginBottom: 20,
    },
    orderInfo: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: 40,
    },
    orderNumber: {
      fontWeight: 'bold',
    },
    itemsTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: 20
    },
    tableHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid #ddd',
      padding: 5,
    },
    tableHeaderCell: {
      fontWeight: 'bold',
    },
    tableRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: 5,
      borderBottom: '1px solid #ddd',
    },
    tableCell: {
    },
    footer: {
      textAlign: 'center',
      marginTop: 50,
    },
  });

  return (
    <div className='w-full'>
        <div className='bg-transparent absolute top-0 bottom-0 left-0 right-0'>
            <div className='p-2 h-full backdrop-blur-xl flex justify-center items-center'>
                <div className='bg-LightGreen w-2/4 rounded-lg shadow-lg p-10'>
                    <Document ref={componentRef}>
                      <Page style={styles.page}>
                        <View style={styles.header}>
                          {/* {orderData.companyLogo && (
                            <Image style={styles.logo} src={icon} alt="Adeego" />
                          )} */}
                          <Text style={styles.title}>Adeego Invoice</Text>
                        </View>

                        <View style={styles.header}>
                          <View style={styles.orderInfo}>
                            <Text style={styles.orderNumber}>Tel: 0725970724</Text>
                            <Text style={styles.orderNumber}>Mpesa Till Number: 4073762 </Text>
                            <Text style={styles.orderNumber}>Till Name: Abdiaziz Abdullahi Abdi</Text>
                          </View>
                        </View>
                        
                        <View style={styles.header}>
                          <View style={styles.orderInfo}>
                            <Text style={styles.orderNumber}>Order Id: {orderData.id}</Text>
                            <Text style={styles.orderNumber}>Date: {currentDate.toDateString()}</Text>
                            <Text style={styles.orderNumber}>{firstName} {lastName}</Text>
                            <Text style={styles.orderNumber}>{phone}</Text>
                            <Text style={styles.orderNumber}>Nairobi, {area}, {estate}, {house}</Text>
                          </View>
                        </View>

                        <View style={styles.spaceCont}>
                          <View style={styles.space}/>
                        </View>
                        
                        <View style={styles.header}>
                          <View style={styles.itemsTable}>
                            <View style={styles.tableHeader}>
                              <Text style={styles.tableHeaderCell}>Product</Text>
                              <Text style={styles.tableHeaderCell}>Quantity</Text>
                              <Text style={styles.tableHeaderCell}>Price</Text>
                            </View>
                            {items.map((item, index) => (
                              <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{item.Name}</Text>
                                <Text style={styles.tableCell}>{item.Quantity}</Text>
                                <Text style={styles.tableCell}>{item.Price}</Text>
                              </View>
                            ))}
                          </View>
                          
                        </View>

                        <View style={styles.orderInfo}>
                          <Text style={styles.orderNumber}>Delivery: Free</Text>
                          <Text style={styles.orderNumber}>Total: {total}</Text>
                        </View>
                            
                        {/* <View style={styles.footer}>
                          <Text>Thank you for your order!</Text>
                        </View> */}
                      </Page>
                    </Document>
                    <button onClick={handlePrint} disabled={isPrinting}>
                      {isPrinting ? 'Printing...' : 'Print Receipt'}
                    </button>
                    <button onClick={handleReceiptFalse} >CANCEL</button>
                </div>
            </div>
        </div>
    </div>
  );
}
