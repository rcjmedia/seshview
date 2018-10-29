class Rooms {
  constructor() {
    this._roomList = [
      // {
      //   title : 'Dell Annual Save Coupon',
      //   body : 'We wouldnt want you to miss out on this huge savings!',
      //   author : 'The Author',
      //   urlTitle : 'Dell%20Annual%20Save%20Coupon'
      // },

      // {
      //   title : 'Extra hot Labor Day deals are now Live',
      //   body : 'Labor Day sale up to 50% off on all the latest tech!',
      //   author : 'Marketing',
      //   urlTitle : 'Labor%20Day%20Deals'
      // }
    ];
  }

  listAll() {
    return this._roomList;
  }

  create(data) {
    if (this.verify(data.title)) return false;

    let roomInfo = {
      title : data.title,
      body : data.body,
      author : data.author,
      urlTitle : encodeURI(data.title)
    };

    this._roomList.push(roomInfo);
    console.log('roomList', this._roomList);
    return true;
  }
  // returns the index that the array is verifyd at
  verify(title) {
    return this._roomList.some(element => {
      return element.title === title;
    })

    return false;
  }

  locate(title) {
    return this._roomList.findIndex((element, index) => {
      return element.title === title;
    })
  }

  retrieve(title) {
    return this._roomList.find(element => {
      return element.title === title;
    })

    return false;
  }

  edit(data) {
    if (this.verify(data.title)) {
      let index = this.locate(data.title);
      let targetItem = this._roomList[index];

      if (data.title) {
        targetItem.title = data.title;
        targetItem.urlTitle = encodeURI(data.title);
      }
      if (data.body) targetItem.body = data.body;
      if (data.author) targetItem.author = data.author;
      
      return true;
    }

    return false;
  }

  remove(title) {
    if (this.verify(title)) {
      let index = this.locate(title);

      return this._roomList.splice(index, 1);
    }

    return false;
  }
}

module.exports = Rooms;