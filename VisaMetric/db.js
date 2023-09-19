/*
let openDB = () => {
   let dbName = "VisaMetric";
   let dbVer = 1;
   let dbRq = indexedDB.open(dbName, dbVer);
   dbRq.onsuccess = (e) => {
       let db = e.target.result;
       let transaction = db.transaction(["userdata"], "readwrite").objectStore("userdata");
       let newData = {
           username: "exampleUser",
           name1: "New Value for name1"
       };
       transaction.onsuccess = (e) => {
           e.put(newData);
           console.log("new profile registration done.");
           db.close();
       };

       transaction.onerror = (e) => {
           console.error(`putRq => Error adding/updating data: ` + e.target.error);
       };
   };
   dbRq.onerror = (e) => {
       console.error("Error opening database: " + e.target.error);
       setTimeout(openDB, 5000);
   };
   dbRq.onupgradeneeded = (e) => {
       let db = e.target.result;
       let indexConfig = {
          _token: { unique: false },
           alternativeemail1: { unique: false },
           alternativeemail2: { unique: false },
           alternativeemail3: { unique: false },
           alternativeemail4: { unique: false },
           alternativeemail5: { unique: false },
           alternativeemail6: { unique: false },
           applicationType: { unique: false },
           biofpval: { unique: false },
           birthday1: { unique: false },
           birthday2: { unique: false },
           birthday3: { unique: false },
           birthday4: { unique: false },
           birthday5: { unique: false },
           birthday6: { unique: false },
           birthmonth1: { unique: false },
           birthmonth2: { unique: false },
           birthmonth3: { unique: false },
           birthmonth4: { unique: false },
           birthmonth5: { unique: false },
           birthmonth6: { unique: false },
           birthyear1: { unique: false },
           birthyear2: { unique: false },
           birthyear3: { unique: false },
           birthyear4: { unique: false },
           birthyear5: { unique: false },
           birthyear6: { unique: false },
           card: { unique: false },
           cardDatepicker: { unique: false },
           city: { unique: false },
           ctval: { unique: false },
           email1: { unique: false },
           email2: { unique: false },
           email3: { unique: false },
           email4: { unique: false },
           email5: { unique: false },
           email6: { unique: false },
           mailConfirmCode: { unique: false },
           name1: { unique: false },
           name2: { unique: false },
           name3: { unique: false },
           name4: { unique: false },
           name5: { unique: false },
           name6: { unique: false },
           office: { unique: false },
           officetype: { unique: false },
           passport1: { unique: false },
           passport2: { unique: false },
           passport3: { unique: false },
           passport4: { unique: false },
           passport5: { unique: false },
           passport6: { unique: false },
           paytype: { unique: false },
           phone1: { unique: false },
           phone2: { unique: false },
           phone21: { unique: false },
           phone22: { unique: false },
           phone23: { unique: false },
           phone24: { unique: false },
           phone25: { unique: false },
           phone26: { unique: false },
           phone3: { unique: false },
           phone4: { unique: false },
           phone5: { unique: false },
           phone6: { unique: false },
           previewchk: { unique: false },
           qtallvert: { unique: false },
           setnewcalendarstatus: { unique: false },
           sheba_name: { unique: false },
           sheba_number: { unique: false },
           surname1: { unique: false },
           surname2: { unique: false },
           surname3: { unique: false },
           surname4: { unique: false },
           surname5: { unique: false },
           surname6: { unique: false },
           totalPerson: { unique: false },
           transactionDatePicker: { unique: false },
           transactionid: { unique: false },
           username: { unique: true },
           view_set_app_country: { unique: false },
           view_set_app_office: { unique: false },
           view_set_app_service_type: { unique: false },
       };

       db.objectStoreNames.contains("userdata") ? null : (userdataObjectStore = db.createObjectStore("userdata", { keyPath: "username" }));
       Object.entries(indexConfig).forEach(([e, config]) => {
           userdataObjectStore.createIndex(e, e, config);
       });
   };
}

openDB()
*/

let dbOpen = () => {
    return new Promise((resolve, reject) => {
        let dbRequest = indexedDB.open("VisaMetric", 1);
        dbRequest.onsuccess = (e) => { resolve(e.target.result); };
        dbRequest.onerror = (e) => { reject(e.target.error); };
    });
}

let dbAdd = (db, newData) => {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction(["userdata"], "readwrite").objectStore("userdata");
        let putRequest = transaction.put(newData);
        putRequest.onsuccess = (e) => { resolve(); };
        putRequest.onerror = (e) => { reject(e.target.error); };
    });
}


function dbRm(db, key) {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction(["userdata"], "readwrite").objectStore("userdata");
        let deleteRequest = transaction.delete(key);
        deleteRequest.onsuccess = (e) => { resolve(); };
        deleteRequest.onerror = (e) => { reject(e.target.error); };
    });
}

async function removeData() {
    try {
        let db = await dbOpen();
        let keyToDelete = 1; // Replace with the actual key you want to delete
        await dbRemove(db, keyToDelete);
        console.log(`Data with key ${keyToDelete} removed successfully`);
        db.close();
    } catch (error) {
        console.error("Error: " + error);
    }
}

// Example usage:
removeData();

async function dbUpdate() {
    try {
        let db = await dbOpen();
        let newData = {
            username: "F U",
            name1: "F U = fuck you"
        };

        await dbAdd(db, newData);
        console.log(`new profile created successfully`);
        db.close();
    } catch (error) {
        console.error("Error: " + error);
    }
}

// Example usage:
dbUpdate();




let indxDB = {
    open: async (dbName, version, storeName, mode) => new Promise((resolve, reject) => {
        let request = indexedDB.open(dbName, version);

        request.onupgradeneeded = (e) => {
            let db = e.target.result;
            !db.objectStoreNames.contains(storeName) && db.createObjectStore(storeName);
        };

        request.onsuccess = (e) => resolve(e.target.result.transaction(storeName, mode).objectStore(storeName));
        request.onerror = (e) => reject(e.target.error);
    }),

    put: async (store, newData) => new Promise((resolve, reject) => {
        let request = store.put(newData);
        request.onsuccess = (e) => resolve();
        request.onerror = (e) => reject(e.target.error);
    }),

    add: async (store, key, newData) => new Promise((resolve, reject) => {
        const request = store.add(newData, key); // Provide a key here
        request.onsuccess = (e) => resolve();
        request.onerror = (e) => reject(e.target.error);
    }),
    
    delete: async (store, key) => new Promise((resolve, reject) => {
        let request = store.delete(key);
        request.onsuccess = (e) => resolve();
        request.onerror = (e) => reject(e.target.error);
    }),
};


// Example usage of indxDB object

// Open the database and initiate a transaction
indxDB.open("MyDatabase", 1, "myStore", "readwrite")
  .then((store) => {
    // Data to be added
    const newData = { id: 1, name: "John Doe", age: 30 };

    // Add data to the store
    return indxDB.put(store, newData);
  })
  .then(() => {
    console.log("Data has been successfully added.");

    // Delete data from the store
    const keyToDelete = 1;
    return indxDB.delete(store, keyToDelete);
  })
  .then(() => {
    console.log("Data with key 1 has been deleted.");
  })
  .catch((error) => {
    console.error("Error: ", error);
  });


let newData = {
    username: "F U",
    name1: "F U = fuck you"
};
indxDB.open("VisaMetric",1,"userdata").put(newData)

