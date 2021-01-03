<template>
  <div>
    <h3>Todo</h3>
    <ul id="incomplete-tasks">
      <li v-for="todo in incompleted" :key="todo.id">
        <label>{{todo.name}}</label>
        <button class="complete" @click="completeTodo(todo)">Complete</button>
        <button class="delete" @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: "pending-todos",
    props: {
      incompleted: {
        type: Array,
        required: true,
      }
    },
    methods: {
      completeTodo(id) {
        this.$emit("complete-todo", id);
      },
      deleteTodo(id) {
        this.$emit("delete-todo", id);
      }
    }
};
</script>

<style scoped>
li {
  overflow: hidden;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}
li > label {
  font-size: 18px;
  line-height: 40px;
  width: 237px;
  padding: 0 0 0 11px;
}

button {
  margin: 0 0 0 10px;
}
</style>