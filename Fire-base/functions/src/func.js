const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc 
} = require("firebase/firestore");
const { request } = require("./app");

const firebaseConfig = {
  apiKey: "AIzaSyAJDJ45Wc4UzDB30IPi3WMG5Niz7ohBXI0",
  authDomain: "leafy-metrics-412708.firebaseapp.com",
  projectId: "leafy-metrics-412708",
  storageBucket: "leafy-metrics-412708.appspot.com",
  messagingSenderId: "487844771795",
  appId: "1:487844771795:web:ce4ad85417b8c7c81ea126",
  measurementId: "G-W3MX1G65MK",
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "todos"));
  const data = await querySnapshot.docs.map((doc) => doc.data());
  return data;
};


exports.getTasks = async function (ctx) {
  
  const fetchedData = await fetchData();

  return (ctx.body = {
    todos: fetchedData,
  });
};

exports.getTask = async function (ctx) {

    const id = ctx.query.id;


    const querySnapshot = await getDocs(collection(db, "todos"));
    const a=querySnapshot.docs.filter((todo)=>{
      if (todo.data().id==id) {
        return todo.data();
      } 
     

    })
    return (ctx.body = {
      todos:  a.map((todo) => todo.data()),
    });
};


exports.addTask = async function (ctx) {
  const contentRequest = ctx.request.body;
  const todos = await fetchData();
  const taskData = {
    ...contentRequest,
    id: tasks.length == 0 ? 1 : todos[tasks.length - 1].id + 1,
    isCompleted: false,
  };

   await addDoc(collection(db, "todos"), taskData);
  const newTasks = await fetchData();
  return (ctx.body = {
    todos: newTasks,
  });
};

exports.updateTasks = async function (ctx) {
  const ids = ctx.request.body;
  const querySnapshot = await getDocs(collection(db, "todos"));
  await querySnapshot.forEach((doc) => {
    if(ids.includes(doc.data().id)){
      updateDoc(doc(db, "todos", doc.id), {
        isCompleted: !doc.data().isCompleted
      });
    }
   
   
  });

  const newTasks = await fetchData();
  return (ctx.body = {
    todos: newTasks,
  });
};

exports.deleTasks = async function (ctx) {
  const ids = ctx.request.body;
  const querySnapshot = await getDocs(collection(db, "todos"));
  await querySnapshot.forEach((doc) => {
    if(ids.includes(doc.data().id)){
      deleteDoc(doc(db, "todos", doc.id));
    }
  });

  const newTasks = await fetchData();
  return (ctx.body = {
    todos: newTasks,
  });
};
