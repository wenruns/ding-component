Component({
  mixins: [],
  data: {
    search_content: '',
  },
  props: {
    onSearch: (content) => {
      console.log(content)
    },
    placeholder: '请输入关键词'
  },
  methods: {
   onsearch(e) {
     this.props.onSearch(this.data.search_content);
   }, 
   synchronization(e) {
     this.setData({
       search_content: e.detail.value
     });
   },
   clear(e){
     this.setData({
       search_content: ''
     });
   }
  },
  didMount(){

  },
  didUpdate(){

  },
  didUnmount(){

  }
});