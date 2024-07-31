
// import { db } from "../firebase.js";
// import { collection, addDoc, getDocs } from "firebase/firestore";

// const generateUniqueId = async (orderCollectionRef) => {
//     let id;
//     let isUnique = false;

//     while (!isUnique) {
//         id = Math.floor(1000 + Math.random() * 9000);
//         const qS = await getDocs(orderCollectionRef);
//         isUnique = ! qS.docs.some(doc => doc.data().id === id);
//     }

//     return id;
// };

// export const order = async (req, res) => {
//     const { name, address, contactNumber, packs, utrRef } = req.body;
//     const orderCollectionRef = collection(db, "orders");

//     try {
//         const uniqueId = await generateUniqueId(orderCollectionRef);
//         const docRef = await addDoc(orderCollectionRef, { id: uniqueId,name, address, contactNumber, packs, utrRef});
//         return res.json({ id: docRef.id, message: "Order added successfully" });
//     } catch (error) {
//         console.error("Error in adding document: ", error);
//         return res.status(500).json({ error: "Failed to add order" });
//     }
// };

// export const getAllOrders=async(req,res)=>{
//     try {
//         const orderCollectionRef = collection(db, "orders");
//         const orders= await getDocs(orderCollectionRef);
//         let arr=[];
//         orders.docs.map((doc)=>{
//             arr.push(doc.data());
//         })
//         console.log(arr);
//         return res.status(200).json({arr});
//     } catch (error) {
//         console.error("Error in getting orders: ", error);
//         return res.status(500).json({ error: "Failed to fetch orders" });
//     }
// }


import { db,app} from "../firebase.js";
import { collection, addDoc, getDocs } from "firebase/firestore";

const generateUniqueId = async (orderCollectionRef) => {
    let id;
    let isUnique = false;

    while (!isUnique) {
        id = Math.floor(1000 + Math.random() * 9000);
        const qS = await getDocs(orderCollectionRef);
        isUnique = ! qS.docs.some(doc => doc.data().id === id);
    }

    return id;
};

export const order = async (req, res) => {
    const { name, contactNumber, packs, utrRef,utrImg,dNo,street,area,price} = req.body;
    console.log({ name, contactNumber, packs, utrRef,utrImg,dNo,street,area,price});
    const orderCollectionRef = collection(db, "orders");
    try {
        const uniqueId = await generateUniqueId(orderCollectionRef);
        const docRef = await addDoc(orderCollectionRef, { id: uniqueId,name, contactNumber, packs, utrRef,utrImg,dNo,street,area,price});
        return res.json({ id: uniqueId, message: "Order added successfully" });
    } catch (error) {
        console.error("Error in adding document: ", error);
        return res.status(500).json({ error: "Failed to add order" });
    }
};

export const getAllOrders=async(req,res)=>{
    try {
        const orderCollectionRef = collection(db, "orders");
        const orders= await getDocs(orderCollectionRef);
        let arr=[];
        orders.docs.map((doc)=>{
            arr.push(doc.data());
        })
        console.log(arr);
        return res.status(200).json({arr});
    } catch (error) {
        console.error("Error in getting orders: ", error);
        return res.status(500).json({ error: "Failed to fetch orders" });
    }
}

export const getOrder=async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    try {
        const orderCollectionRef=collection(db,"orders");
        const orders=await getDocs(orderCollectionRef);
        let arr=[];
        orders.docs.map((doc)=>{
            if(doc.data().id==id){
                arr.push(doc.data());
            }
        })
        console.log(arr);
        return res.status(200).json({arr});
    } catch (error) {
        console.error("Error in getting order: ", error);
        return res.status(500).json({ error: "Failed to fetch order" });
    }
} 