<template>
    <pie-chart :donut="true"
    :data="[['Remaining', completedTasksCount], ['Completed', remainingTasksCount]]">
    </pie-chart>
</template>

<script>

export default {
  name: 'ChartsView',
  mounted() {
    const serviceName = 'todos';
    const params = {
      query: {
        completed: true,
      },
    };
    const config = {
      channels: [
        {
          prop: 'completed',
          value: true,
        },
      ],
    };

    const completedTasks = this.$dbCon.wingsService(serviceName, params, config);

    this.completedTasks = completedTasks;

    completedTasks.on('dataChange', async () => {
      this.completedTasksCount = (await this.completedTasks.find(
        { query: { completed: true } },
      )).total;
    });

    this.completedTasks = completedTasks.init();


    const params2 = {
      query: {
        completed: false,
      },
    };
    const config2 = {
      channels: [
        {
          prop: 'completed',
          value: false,
        },
      ],
    };

    const remainingTasks = this.$dbCon.wingsService(serviceName, params2, config2);

    this.remainingTasks = remainingTasks;

    remainingTasks.on('dataChange', async () => {
      this.remainingTasksCount = (await this.remainingTasks.find(
        { query: { completed: false } },
      )).total;
    });

    this.remainingTasks = remainingTasks.init(
    );

    console.log('R TAsks onInit', this.remainingTasks);
    console.log('C TAsks onInit', this.remainingTasks);
    console.log('Completed Tasks', this.completedTasksCount);
    console.log('Remaining Tasks', this.remainingTasksCount);
  },
  data() {
    return {
      completedTasks: null,
      remainingTasks: null,
      completedTasksCount: null,
      remainingTasksCount: null,
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

      return this.todosService.length;
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

      return this.todosService.length;
    },
  },
};
</script>
