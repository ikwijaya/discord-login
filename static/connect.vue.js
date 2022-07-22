const Connect = {
    template: `
      <div>
        <button @click="connect">Connect</button>
      </div>`,
  
    data() {
        return { };
    },
    created(){},
    computed: {
        is_connected() { return this.$root.is_connected; },
    },
    methods: {
        connect(){ this.$emit('connect'); }
    }
};