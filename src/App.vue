<template>
  <div id="app">
    <div class="container">
      <button @click.prevent="changeTab('add-todo')" class="nav">
        Add Todo
      </button>
      <button @click.prevent="changeTab('pending-todo')" class="nav">
        Pending Todos
      </button>
      <button @click.prevent="changeTab('completed-todo')" class="nav">
        Completed Todos
      </button>

      <keep-alive>
        <component
          :is="currentComponent"
          :incompleted="incompletedTodos"
          :completed="completedTodos"
          @add-todo="onAddTodo"
          @complete-todo="onCompleteTodo"
          @delete-todo="onDeleteTodo"
          @restore-todo="onRestoreTodo"
        ></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import AddTodo from "./components/AddTodo.vue";
import CompletedTodos from "./components/CompletedTodos.vue";
import PendingTodos from "./components/PendingTodos.vue";

export default {
  name: "App",
  created() {
    this.getData();
  },
  data() {
    return {
      currentComponent: "pending-todo",
      todosArray: [],
    };
  },
  computed: {
    incompletedTodos() {
      if (this.todosArray.length > 0) {
        return this.todosArray
          .filter((x) => !x.isCompleted)
          .sort((a, b) => a.name.localeCompare(b.name));
      } else {
        return [];
      }
    },
    completedTodos() {
      if (this.todosArray.length > 0) {
        return this.todosArray
          .filter((x) => x.isCompleted)
          .sort((a, b) => a.name.localeCompare(b.name));
      } else {
        return [];
      }
    },
  },
  methods: {
    changeTab(component) {
      this.currentComponent = component;
    },
    getData() {
      this.todosArray = [];

      this.$http
        .get("todos.json")
        .then((resp) => {
          for (const key in resp.body) {
            if (resp.body.hasOwnProperty.call(resp.body, key)) {
              resp.body[key].id = key;
              this.todosArray.push(resp.body[key]);
            }
          }
        })
        .catch((err) => console.log(err));
    },
    onAddTodo(todoName) {
      let payload = {
        name: todoName,
        isCompleted: false,
      };

      this.$http
        .post("todos.json", payload)
        .then(() => {
          this.changeTab("pending-todo");
          this.getData();
        })
        .catch((err) => console.log(err));
    },
    onCompleteTodo(todo) {
      this.$http
        .put(`todos/${todo.id}.json`, {
          name: todo.name,
          isCompleted: true,
        })
        .then(() => {
          this.getData();
        })
        .catch((err) => console.log(err));
    },
    onDeleteTodo(id) {
      this.$http
        .delete(`todos/${id}.json`)
        .then(() => {
          this.getData();
        })
        .catch((err) => console.log(err));
    },
    onRestoreTodo(todo) {
      this.$http
        .put(`todos/${todo.id}.json`, {
          name: todo.name,
          isCompleted: false,
        })
        .then(() => {
          this.getData();
        })
        .catch((err) => console.log(err));
    },
  },
  components: {
    "add-todo": AddTodo,
    "completed-todo": CompletedTodos,
    "pending-todo": PendingTodos,
  },
};
</script>

<style>
body {
  background: #fff;
  color: #333;
  font-family: Lato, sans-serif;
}
.container {
  display: block;
  width: 400px;
  margin: 25px auto 0;
}
button.nav {
  padding: 0 20px;
  white-space: nowrap;
  width: auto;
  border-right: solid 1px black;
}
button.nav:last-of-type {
  border-right: none;
}
button.nav:hover {
  background-color: rgb(250, 250, 250);
  color: black;
}
ul {
  margin: 0;
  padding: 0;
}
li * {
  float: left;
}
li,
h3 {
  clear: both;
  list-style: none;
}
input,
button {
  outline: none;
}
button {
  background: none;
  border: 0px;
  color: #888;
  font-size: 15px;
  width: 60px;
  margin: 10px 0 0;
  font-family: Lato, sans-serif;
  cursor: pointer;
}
button:hover {
  color: #333;
}
h3,
label[for="new-task"] {
  color: #333;
  font-weight: 700;
  font-size: 15px;
  border-bottom: 2px solid #333;
  padding: 30px 0 10px;
  margin: 0;
  text-transform: uppercase;
}
input[type="text"] {
  margin: 0;
  font-size: 18px;
  line-height: 18px;
  height: 18px;
  padding: 10px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  font-family: Lato, sans-serif;
  color: #888;
}
input[type="text"]:focus {
  color: #333;
}
</style>
