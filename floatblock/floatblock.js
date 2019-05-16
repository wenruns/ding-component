Component({
  mixint: [],
  data: {
    show_button: false,
    show_rate: 0,
    box_width: {},
    screen_height: 0,
    screen_width: 0,
    is_left: true,
    icon_style: {},
    is_move: false,
    button_style: {}
  },
  props: {
    buttons: [
      {
        title: "按钮一",
      },
      {
        title: "按钮二",
      },
      {
        title: "按钮三",
      },
    ],

    onBtnClick: (e) => {
      console.log("onclick", e)
    }

  },
  methods: {
    buttonClick(event){
      let box_width = this.data.box_width;
      box_width.width = '9vw';
      this.setData({
        box_width: box_width,
        show_button: false
      })
      this.props.onBtnClick(event);
    },
    showButton(e){
      if (this.props.onShowButton) {
        this.props.onShowButton(e);
      } else {
        let box_width = this.data.box_width;
        box_width.width = (this.props.buttons.length * 15 + this.props.buttons.length*2 +9) + "vw";
        this.setData({
          show_button: true,
          box_width: box_width
        });
      }
    },
    shrinkButton(){
      // console.log('shrink')
      let box_width = this.data.box_width;
      box_width.width = '9vw';
      this.setData({
        show_button: false,
        box_width: box_width
      })
    },
    moveFloatBlock(event){
      // console.log("move", "screen_width="+this.data.screen_width, "screen_height="+this.data.screen_height, event)
      let pageX = event.touches[0].pageX, pageY = event.touches[0].pageY;
      if (pageY < 0) {
        pageY = 0;
      }
      if (pageX < 0) {
        pageX = 0;
      }
      if (pageX > this.data.screen_width) {
        pageX = this.data.screen_width;
      }
      if (pageY > this.data.screen_height) {
        pageY = this.data.screen_height;
      }
      let box_width = this.data.box_width, icon_style = this.data.icon_style;
      box_width["border-radius"] = "10vw";
      box_width.top =  pageY;
      if (pageX >= (this.data.screen_width / 2)) {
        box_width.right = this.data.screen_width - pageX;
        box_width.left = '';
      } else {
        box_width.right = '';
        box_width.left = pageX;
      }
      box_width.width = '10vw';
      box_width.height = '10vw';
      box_width.transition = "all 0s";

      icon_style['margin-right'] = "1vw";
      icon_style['margin-left'] = "1vw";
      this.setData({
        box_width: box_width,
        // show_button: false,
        icon_style: icon_style,
        is_move: true
      });

    },
    touchStart(event){
      // console.log('touchstart...', event)
      // let box_width = this.data.box_width;
     
      // this.setData({
      //   box_width: box_width
      // });
    },
    touchEnd(event){
      if (!this.data.is_move) {
        return ;
      }
      // console.log("toucheend...", event)
      let box_width = this.data.box_width, is_left = true, icon_style = this.data.icon_style, button_style = this.data.button_style;
      box_width.transition = "all "+this.data.show_rate+"s";
      box_width.width = '9vw';
      if (event.changedTouches[0].pageX >= (this.data.screen_width / 2)) {
        is_left = false;
        box_width.right = '0px';
        box_width.left = '';
        box_width['border-radius'] = "10vw 0vw 0vw 10vw";
        icon_style['margin-left'] = '1vw';
        icon_style['margin-right'] = '0vw';
        button_style['text-align'] = "right";
      } else {
        box_width.right = '';
        box_width.left = '0px';
        box_width['border-radius'] = "0vw 10vw 10vw 0vw";
        icon_style['margin-left'] = '0vw';
        icon_style['margin-right'] = '1vw';
        button_style['text-align'] = "left";
      }
      // console.log();
      this.setData({
        box_width: box_width,
        icon_style: icon_style,
        is_left: is_left,
        is_move: false,
        button_style: button_style,
        show_button: false
      })
    }
  },
  didMount(options){
    // console.log("合并对象", Object.assign({
    //   ooo: "ll"
    // }, {
    //   qqq: 'sss'
    // }));
    dd.getSystemInfo({
      complete: res => {
        this.setData({
          screen_height: res.windowHeight * 0.85,
          screen_width: res.windowWidth * 0.9
        })
      }
    });
    let s = (this.props.buttons.length * 15 + this.props.buttons.length*2 +9) / 120;
    this.setData({
      box_width: {
        width: '9vw',
        transition: 'all '+s+'s',
        top: '0px',
        left: '0px',
        right: '',
        "border-radius": "0vw 10vw 10vw 0vw"
      },
      show_rate: s,
      icon_style: {
        "margin-right": "1vw",
        "margin-left": ""
      },
      button_style: {
        "text-align": "left"
      }
    });
  },
  didUpdate(options){

  },
  didUnmount(options){

  }

});