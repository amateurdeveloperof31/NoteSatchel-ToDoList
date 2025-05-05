import { database } from '../config/database';
import { ref, remove } from "firebase/database";

export const deleteData = async (key) => {
    const dbRef = ref(database, `todoitems/${key}`);
    console.log("Delete Key: ", key)
    try {
      await remove(dbRef);
    } catch (error) {
      alert("Error deleting item: ", error.message);
    }
};
