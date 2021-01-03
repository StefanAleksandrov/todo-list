<template>
  <div>
    <h3>Completed</h3>
    <ul id="completed-tasks" v-if="completed.length > 0">
      <li v-for="todo in completed" :key="todo.id">
        <label>{{ todo.name }}</label>
        <button class="restore" @click="restoreTodo(todo)">Restore</button>
        <button class="delete" @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
    <ul v-else>
      <li>
        <label>No Todos to Display</label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "completed-todos",
  props: {
    completed: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    restoreTodo(id) {
      this.$emit("restore-todo", id);
    },
    deleteTodo(id) {
      this.$emit("delete-todo", id);
    }
  },
};
</script>

<style scoped>
#completed-tasks label {
  text-decoration: line-through;
  color: #888;
}

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
li > .delete:hover {
  color: #cf2323;
}
</style>