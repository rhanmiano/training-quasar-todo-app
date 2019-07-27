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
            <div class="row items-center justify-center">
                <div class="col-xs-12 col-sm-6 vertical-middle column">
                    <q-input class="q-mb-sm" @keyup.enter="addTodo"
                    v-model="newTodo" label="Task" />
                    <q-btn @click="addTodo" :disabled="!newTodo"
                    color="white" text-color="black">Add</q-btn>
                </div>
            </div>

             <div class="row item-center justify-center">
                <div class="col-xs-12 col-sm-6">
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
            </div>
            <div class="row item-center justify-center">
                <div class="col-xs-12 col-sm-6">
                    <h6>Done Todos</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Todo',
  data() {
    return {
      todos: [
        { id: Math.random(), title: 'Item 1', completed: false },
        { id: Math.random(), title: 'Item 2', completed: false },
        { id: Math.random(), title: 'Item 3', completed: false },
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
        id: Math.random(),
        title: todo,
        text: 'I am a text',
        completed: false,
      };

      this.todos.push(item);

      this.newTodo = '';
    },
    deleteTodo(id) {
      console.log(id);
      console.log(this.todos);
      this.todos = this.todos.filter(value => value.id !== id);
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
