<template>
    <div class="q-pa-md q-gutter-y-sm">
        <q-toolbar class="text-primary">
        <q-btn flat round dense icon="menu" />
        <q-toolbar-title>
            Todo App
        </q-toolbar-title>
        <q-btn flat round dense icon="bar_chart" @click="$router.push('/chart')" />
        <q-btn flat round dense icon="more_vert" />
        </q-toolbar>

        <div class="q-pa-sm">
            <div class="row items-center">
                <div class="col-10">
                    <q-input @keyup.enter="addTodo" v-model="newTodo" label="Task" />
                </div>
                <div class="col-2 vertical-middle text-center">
                    <q-btn @click="addTodo" :disabled="!newTodo"
                    color="white" text-color="black" icon="send" round/>
                </div>
            </div>

        </div>

        <div class="q-pa-sm">
            <h6>Todos</h6>
            <q-item clickable v-ripple v-for="(todo, i) in todos" v-bind:key="i">
                <q-item-section avatar>
                    <q-checkbox @click="!todo.completed" v-model="todo.completed" />
                </q-item-section>
                <q-item-section>
                    <q-item-label :class="{'strike-through': todo.completed }">
                        {{ todo.title }}
                    </q-item-label>
                </q-item-section>
                <q-item-section side>
                    <q-btn @click="deleteTodo(todo.id)" icon="delete"
                    color="negative" round size="sm"></q-btn>
                </q-item-section>
            </q-item>
        </div>

        <div class="q-pa-sm">
            <h6>Done Todos</h6>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Todo',
  data() {
    return {
      todos: [
        { id: 0, title: 'Item 1', completed: false },
        { id: 1, title: 'Item 2', completed: false },
        { id: 2, title: 'Item 3', completed: false },
      ],
      doneTodos: [],
      newTodo: '',
    };
  },
  methods: {
    addTodo() {
      const todo = this.newTodo && this.newTodo.trim();
      if (!todo || todo === '') {
        return;
      }

      const item = {
        id: this.todos.length,
        title: todo,
        text: 'I am a text',
        completed: false,
      };

      this.todos.push(item);

      this.newTodo = '';
    },
    deleteTodo(id) {
      this.todos.splice(id, 1);
    },
    doneTodo() {
    //   this.todos.splice();
    },
  },
};
</script>

<style scoped>
    .strike-through {
        text-decoration: line-through;
    }
</style>
