
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, setDoc, doc, getDoc, getDocs, serverTimestamp, onSnapshot, CACHE_SIZE_UNLIMITED, enableIndexedDbPersistence, where, query, documentId, deleteDoc } from "firebase/firestore";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import localforage from "localforage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// forBrowser
let analytics;
let messaging;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
    messaging = getMessaging(app);
    const gettokenfromlocal = async () => {
        const token = await localforage.getItem("fcm_token");
        if (token) return token;
        return null;
    };
    gettokenfromlocal().then((tokenInLocalForage) => {
        if (!tokenInLocalForage) {
            let token;
            // Request the push notification permission from browser
            const getNotificationStatus = async () => {
                return await Notification.requestPermission()
            }
            getNotificationStatus().then((status) => {
                if (status && status === "granted") {
                    // Get new token from Firebase
                    const getNewToken = async () => {
                        const data = await getToken(messaging, {
                            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAP_ID,
                        });
                        return data;
                    }
                    getNewToken().then((fcm_token) => {
                        // Set token in our local storage
                        if (fcm_token) {
                            localforage.setItem("fcm_token", fcm_token);
                            token = fcm_token;
                        }
                    })
                }
            })
            return token;
        } else {
            return tokenInLocalForage;
        }

    })

}
// const analytics = getAnalytics(app);
const auth = getAuth();
auth.languageCode = 'en';

function setUpRecaptcha(phone) {
    const recaptcha = new RecaptchaVerifier('recaptcha-container', {}, auth)
    recaptcha.render();
    return signInWithPhoneNumber(auth, phone, recaptcha);
}

async function addDocument(database, data) {
    try {
        const response = await addDoc(collection(db, database), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        const resdata = await getDoc(response)
        const newdata = resdata.data()
        return { ...newdata, id: resdata.id}
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function addNamedDocument(database, data, name) {
    try {
        await setDoc(doc(db, database, name), {
            ...data,
            updatedAt: serverTimestamp()
        }, { merge: true });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function getDocument(database, name) {
    const docRef = doc(db, database, name);
    const docSnap = await getDoc(docRef, { includeMetadataChanges: true });
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

async function getDocuments(database, whereQuery) {
    const dataArray = [];
    let querySnapshot;
    if (whereQuery) {
        const queries = query(collection(db, database), whereQuery);
        querySnapshot = await getDocs(queries);
    } else {
        querySnapshot = await getDocs(collection(db, database), { includeMetadataChanges: true });
    }
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const data = doc.data();
        dataArray.push({ ...data, id: doc.id });
    });
    return dataArray;
}

function subscribe(database, subscribeFn) {
    onSnapshot(collection(db, database), { includeMetadataChanges: true }, (querySnapshot) => {
        const dataArray = [];
        querySnapshot.docs.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const data = doc.data();
            dataArray.push({ ...data, id: doc.id });
        });
        subscribeFn(dataArray)
    });
}

function createRef(path, data) {
    const ref = doc(db, path, data)
    return ref;
}

async function getRef(ref) {
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

async function updateDocument(database, data, name) {
    try {
        await setDoc(doc(db, database, name), {
            ...data,
            updatedAt: serverTimestamp()
        }, { merge: true });
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

async function deleteDocument(database, name) {
    const response = await deleteDoc(doc(db, database, name));
    return response;
}

async function uploadFile(path, file) {
    const fullname = file.name.split('.');
    const name = fullname[0];
    const extension = fullname[1];
    const filepath = `${path}/${name}-${Date.now()}.${extension}`;
    const fileRef = ref(storage, filepath)
    await uploadBytes(fileRef, file);
    return filepath;
}

async function getFile(path) {
    try {
        const fileRef = ref(storage, path);
        const downloadUrl = await getDownloadURL(fileRef);
        return downloadUrl;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

async function deleteFile(path) {
    const fileRef = ref(storage, path);
    deleteObject(fileRef).then(() => {
        return true;
    }).catch((error) => {
        console.error(error.message);
        return false;
    });
}


export {
    app,
    auth,
    setUpRecaptcha,
    addDocument,
    addNamedDocument,
    getDocument,
    getDocuments,
    uploadFile,
    updateDocument,
    getFile,
    deleteFile,
    createRef,
    subscribe,
    getRef,
    messaging,
    analytics,
    onMessage,
    serverTimestamp,
    where,
    documentId,
    deleteDocument
};
