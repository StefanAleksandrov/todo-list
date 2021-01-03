<template>
  <p>
    <label for="new-task">Add Item</label>
    <input id="new-task" type="text" v-model="newTodo" @keypress.enter="addTodo"/>
    <button @click.prevent="addTodo" >Add</button>
  </p>
</template>

<script>
export default {
  name: "add-todo",
  data() {
    return {
      newTodo: "",
    };
  },
  methods: {
    addTodo() {
      this.newTodo = this.newTodo.trim();
      if (this.newTodo != "") {
        this.$emit("add-todo", this.newTodo);
        this.newTodo = "";
      }
    },
  },
};
</script>

<style scoped>
label[for="new-task"] {
  display: block;
  margin: 0 0 20px;
}
input#new-task {
  float: left;
  width: 318px;
}
p > button:hover {
  color: #0fc57c;
}
</style>