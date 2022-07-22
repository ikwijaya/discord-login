const FuzzTransfer = {
    template: `
      <div>
          Fuzz Transfer <input type="number" label="Amount" v-model="amount" />
          <button @click="send">Send</button>
      </div>`,
  
    data() {
        return {
            amount: null
        };
    },
    created(){},
    computed: {
        is_connected() { return this.$root.is_connected; },
    },
    methods: {
        send(){ this.$emit('send', this.amount); },
        aalert(){
            alert('Please connect to Metamask')
        }
    }
};