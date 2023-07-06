import React, { useState, useEffect } from "react";
import {useSession} from "next-auth/react";

import {db} from "@/firebase";
import {
    collection,
    query,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    orderBy,
    where,
    deleteField,
  } from "firebase/firestore";

const subCollection = collection(db, "subject");

const manage_admin = () => {
  const [subject, setSubject] = useState([]);



  return (
    <div>dkdkd</div>
  );
};

export default manage_admin;