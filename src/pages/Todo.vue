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
            <div class="row" items-center justify-center>
                <div class="col-xs-12 column">
                    <q-btn class="col-6" @click="showTasks"
                    color="white" text-color="black">Todos</q-btn>
                    <q-btn class="col-6" @click="showCompletedTasks"
                    color="white" text-color="black">Completed</q-btn>
                </div>
            </div>
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
                            <q-checkbox @click.native="doneTodo(todo._id, todo)"
                            :value="todo.completed" />
                        </q-item-section>
                    <q-item-section>
                        <q-item-label :class="{'strike-through': todo.completed }">
                            {{ todo.title }}
                        </q-item-label>
                    </q-item-section>
                        <q-item-section side>
                            <q-btn @click="deleteTodo(todo._id)" icon="delete"
                            color="negative" round size="sm"></q-btn>
                        </q-item-section>
                    </q-item>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Todo',
  mounted() {
    const serviceName = 'todos';
    const params = {
      query: {
        completed: false,
      },
    };
    const config = {
      channels: [
        {
          prop: 'completed',
          value: false,
        },
      ],
    };
    const todosService = this.$dbCon.wingsService(serviceName, params, config);

    this.todosService = todosService;

    todosService.on('dataChange', (todos) => {
      console.log('Hello', todos);
      this.todos = todos;
    });

    todosService.init();
  },
  data() {
    return {
      todosService: null,
      todos: [],
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
        title: todo,
        completed: false,
      };

      this.$dbCon.services.todos.create(item);

      this.newTodo = '';
    },
    deleteTodo(id) {
    //   console.log(id);
    //   console.log(this.todos);
    //   this.todos = this.todos.filter(value => value.id !== id);
      this.$dbCon.services.todos.remove(id);
    },
    doneTodo(id, todo) {
      console.log(id, todo);
      this.$dbCon.services.todos.patch(id, {
        completed: !todo.completed,
      });
    },
    showCompletedTasks() {
      const params = {
        query: {
          completed: true,
        },
      };
      const config = {
        channels: [
          {
            prop: 'completed',
            value: false,
          },
        ],
      };

      this.todosService.reset(params, config);
    },
    showTasks() {
      const params = {
        query: {
          completed: false,
        },
      };
      const config = {
        channels: [
          {
            prop: 'completed',
            value: false,
          },
        ],
      };

      this.todosService.reset(params, config);
    },
  },
};
</script>

<style scoped>
    .strike-through {
        text-decoration: line-through;
    }
</style>
