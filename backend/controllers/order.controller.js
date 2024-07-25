import { db } from "../firebase.js";
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
    const { name, address, contactnumber, packs, utrref } = req.body;
    const orderCollectionRef = collection(db, "orders");

    try {
        const uniqueId = await generateUniqueId(orderCollectionRef);
        const docRef = await addDoc(orderCollectionRef, { id: uniqueId, name, address, contactnumber, packs, utrref });
        return res.json({ id: docRef.id, message: "Order added successfully" });
    } catch (error) {
        console.error("Error in adding document: ", error);
        return res.status(500).json({ error: "Failed to add order" });
    }
};
