const calculator = require('../../utils/calculator.js');

Page({
  data: {
    linkType: "downlink", // 默认为下行链路
    calcType: "datarate", // 默认由datarate计算
    modcods: [], // 将根据链路类型加载
    modcodIndex: 0,
    inputDataRate: "",
    inputSymbolRate: "",
    result: {
      dataRate: "",
      symbolRate: "",
      bandwidth: "",
      efficiency: ""
    },
    rollOffPercentage: 0,
    showResult: false
  },
  
  onLoad: function() {
    // 初始化加载下行链路的modcods和滚降因子百分比
    this.setData({
      modcods: calculator.DOWNLINK_MODCODS,
      rollOffPercentage: calculator.getRollOffPercentage()
    });
  },
  
  // 切换链路类型
  onLinkTypeChange: function(e) {
    const linkType = e.detail.value;
    this.setData({
      linkType: linkType,
      modcods: linkType === "downlink" ? calculator.DOWNLINK_MODCODS : calculator.UPLINK_MODCODS,
      modcodIndex: 0,
      showResult: false
    });
  },
  
  // 切换计算类型
  onCalcTypeChange: function(e) {
    const calcType = e.detail.value;
    this.setData({
      calcType: calcType,
      showResult: false
    });
  },
  
  // 选择MODCOD
  bindModcodChange: function(e) {
    this.setData({
      modcodIndex: e.detail.value,
      showResult: false
    });
  },
  
  // 输入数据速率
  inputDataRate: function(e) {
    this.setData({
      inputDataRate: e.detail.value,
      showResult: false
    });
  },
  
  // 输入符号速率
  inputSymbolRate: function(e) {
    this.setData({
      inputSymbolRate: e.detail.value,
      showResult: false
    });
  },
  
  // 执行计算
  calculate: function() {
    const { calcType, modcods, modcodIndex, inputDataRate, inputSymbolRate, rollOffPercentage } = this.data;
    const selectedModcod = modcods[modcodIndex];
    
    if (calcType === 'datarate') {
      if (!inputDataRate) {
        wx.showToast({
          title: '请输入数据速率',
          icon: 'none'
        });
        return;
      }
      
      const dataRate = parseFloat(inputDataRate);
      const symbolRate = calculator.calculateSymbolRate(dataRate, selectedModcod);
      const bandwidth = calculator.calculateBandwidth(symbolRate);
      const efficiency = calculator.calculateEfficiency(dataRate, bandwidth);
      
      this.setData({
        result: {
          dataRate: dataRate.toFixed(3) + " kbps",
          symbolRate: symbolRate.toFixed(3) + " ksps (-" + rollOffPercentage + "%)",
          bandwidth: bandwidth.toFixed(3) + " kHz (-" + rollOffPercentage + "%)",
          efficiency: efficiency.toFixed(3) + " bps/Hz"
        },
        showResult: true
      });
    } else {
      if (!inputSymbolRate) {
        wx.showToast({
          title: '请输入符号速率',
          icon: 'none'
        });
        return;
      }
      
      const symbolRate = parseFloat(inputSymbolRate);
      const dataRate = calculator.calculateDataRate(symbolRate, selectedModcod);
      const bandwidth = calculator.calculateBandwidth(symbolRate);
      const efficiency = calculator.calculateEfficiency(dataRate, bandwidth);
      
      this.setData({
        result: {
          symbolRate: symbolRate.toFixed(3) + " ksps (-" + rollOffPercentage + "%)",
          dataRate: dataRate.toFixed(3) + " kbps",
          bandwidth: bandwidth.toFixed(3) + " kHz (-" + rollOffPercentage + "%)",
          efficiency: efficiency.toFixed(3) + " bps/Hz"
        },
        showResult: true
      });
    }
  }
})