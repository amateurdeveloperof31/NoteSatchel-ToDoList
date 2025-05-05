import { database } from '../config/database';
import { ref, set, push } from "firebase/database";

export const saveData = async (setTodos, newTodo) => {
    const newDocRef = push(ref(database, "todoitems"));
    set(newDocRef, newTodo).catch((error) => {
        alert("Error adding todo item: ", error.message);
      });
      const key = newDocRef.key;
      setTodos((prevTodos) => {
        console.log("Save Data: ", key, newTodo)
        return { ...prevTodos, [key]: newTodo };
      });
}
