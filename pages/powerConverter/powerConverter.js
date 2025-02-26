const calculator = require('../../utils/calculator.js');

Page({
  data: {
    convertType: "wattsTodBm", // 默认瓦特转dBm
    inputWatts: "",
    inputDBm: "",
    result: {
      value: "",
      unit: ""
    },
    showResult: false
  },
  
  // 切换转换类型
  onConvertTypeChange: function(e) {
    const convertType = e.detail.value;
    this.setData({
      convertType: convertType,
      showResult: false
    });
  },
  
  // 输入瓦特值
  inputWatts: function(e) {
    this.setData({
      inputWatts: e.detail.value,
      showResult: false
    });
  },
  
  // 输入dBm值
  inputDBm: function(e) {
    this.setData({
      inputDBm: e.detail.value,
      showResult: false
    });
  },
  
  // 执行转换
  convert: function() {
    const { convertType, inputWatts, inputDBm } = this.data;
    
    if (convertType === 'wattsTodBm') {
      if (!inputWatts) {
        wx.showToast({
          title: '请输入功率(W)',
          icon: 'none'
        });
        return;
      }
      
      const watts = parseFloat(inputWatts);
      const dBm = calculator.wattsTodBm(watts);
      
      this.setData({
        result: {
          value: dBm.toFixed(2),
          unit: "dBm"
        },
        showResult: true
      });
    } else {
      if (!inputDBm) {
        wx.showToast({
          title: '请输入功率(dBm)',
          icon: 'none'
        });
        return;
      }
      
      const dBm = parseFloat(inputDBm);
      const watts = calculator.dBmToWatts(dBm);
      
      this.setData({
        result: {
          value: watts.toFixed(5),
          unit: "W"
        },
        showResult: true
      });
    }
  }
})