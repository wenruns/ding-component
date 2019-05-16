Component({
  mixins:[],
  data: {},
  props:{
    userinfo: {}
  },
  didMount() {  
  },
  didUpdate(){
    console.log('userinfo....props', this.props.userinfo);
  },
  didUnmount(){},
  methods:{
    
  },
})