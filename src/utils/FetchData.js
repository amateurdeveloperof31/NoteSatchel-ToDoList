import { database } from '../config/database';
import { ref, get } from "firebase/database";

export const fetchData = async () => {
    const db = database;
    const dbRef = ref(db, "todoitems");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
        const todoItems = snapshot.val();
        return { todoItems, nextItemId: Object.keys(todoItems).length + 1 };
    } else {
        return { todoItems: {}, nextItemId: 1 };
    }
}
