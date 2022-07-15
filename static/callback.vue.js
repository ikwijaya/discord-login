/***
 * return API from /v1/token
 * {
 *      "success":true,
 *      "color":"green",
 *      "msg":"Data received",
 *      "data":{
 *          "access_token":"xA3DqFk7iM01C4kZC7yQs1GeFhBFxZ",
 *          "expires_in":604800,
 *          "refresh_token":"BGcRKCoLCL02t6DbmpIUnY0OGdGnFs",
 *          "scope":"identify",
 *          "token_type":"Bearer"
 *      }
 * }
 */

const Callback = {
    template: `
      <div>
            <div id="overlay" :style="{ display: loading ? 'block': 'none' }">
                <div id="text">Please wait...</div>
            </div>

            <div>
                <h2>DISCORD LOGIN</h2>
                <div v-if="is_valid">
                    <img class="rounded-circle" :src="avatar_url" height="150" width="150"></img>
                    <div>Username: {{ username }} ({{ id }})</div>
                </div>
            </div>
      </div>`,
  
    data() {
        return {
            id: null,
            avatar_url: null,
            username: null,
            banner: null,
            banner_color: null,
            is_valid: false,
        };
    },
    computed: {
        urls() { return this.$root.baseurl; },
        prefix() { return this.$root.prefix; },
        loading() { return this.$root.loading }
    },
    mounted() {
        this.validate();
    },
    methods: {
        async validate(){
            try {
                const rt = this.$route.query
                const me = {
                    token_type: rt.token_type,
                    access_token: rt.access_token,
                    refresh_token: rt.refresh_token
                }
                const qs = await jsonToQs(me)
                await this.getMe(qs).catch(e => { console.log(e) })

                //// set localstorage
                for (const key in me) {
                    if (Object.hasOwnProperty.call(me, key)) {
                        const element = me[key];
                        window.localStorage.setItem(this.prefix+key, element);
                    }
                }
            } catch (error) {
                console.log(`error => `,error)
            }
        },
        sendToLocalStorage(object = {}){
            this.id = object.id
            this.avatar_url = this.urls.avatar+'/'+object.id+'/'+object.avatar
            this.username = object.username
            this.banner = object.banner ? this.urls.avatar+'/'+object.id+'/'+object.banner : null
            this.banner_color = object.banner_color

            for (const key in object) {
                if (Object.hasOwnProperty.call(object, key)) {
                    const element = object[key];
                    window.localStorage.setItem(this.prefix+key, element);
                }
            }
        },
        async getMe(qs) {
            const res = await axios.get(this.urls.me+'?'+qs, {
                crossdomain: true,
            });
    
            if(res.data.success) this.sendToLocalStorage(res.data.data)
            this.is_valid = res.data.success
            this.$emit("auth-verified", this.is_valid);
        }
    },
};

//// build json format to query-string
const jsonToQs = (object = {}) => {
    return new Promise((resolve) => {
        let arr = []
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                arr.push(key+'='+element)
            }
        }
  
        resolve(arr.join('&'));
    })
}