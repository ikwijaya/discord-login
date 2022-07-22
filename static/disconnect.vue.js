const Disconnect = {
    template: `
      <div>
          <button @click="disconnect">Disconnect</button>
      </div>`,
  
    data() {
        return { };
    },
    created(){},
    computed: {
        is_connected() { return this.$root.is_connected; },
    },
    methods: {
        disconnect(){ this.$emit('disconnect'); }
    }
};