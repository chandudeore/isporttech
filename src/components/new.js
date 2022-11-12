function new1(arr) {
  let tempArr = [];
  arr.map((item) => {
    let count = 0;
    tempArr.map((item2) => {
      if (item2.LeagueName == item.LeagueName) {
        item2.obj.push(item);
        count++;
      }
    });
    if (count == 0) {
      let obj1 = {
        LeagueName: item.LeagueName,
        obj: [item],
      };
      tempArr.push(obj1);
    }
  });
}
