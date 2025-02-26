Page({
  data: {},
  
  navigateToLinkEfficiency: function() {
    wx.navigateTo({
      url: '../linkEfficiency/linkEfficiency'
    })
  },
  
  navigateToPowerConverter: function() {
    wx.navigateTo({
      url: '../powerConverter/powerConverter'
    })
  }
})