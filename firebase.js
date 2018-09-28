var firebase = require("firebase-admin");
var serviceAccount = require("./ibmhackathon-d25ec-firebase-adminsdk-1dqou-9a11915b80.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://ibmhackathon-d25ec.firebaseio.com"
});

var db = firebase.database();

class FirebaseTools {

  constructor() {
    this.self = this;
  };
  static getInventory(user_id, callback) {
    var ref = db.ref(user_id);
    ref.once("value", function(snapshot) {
      callback(snapshot.val());
    });
  };
  
  static getGlobalInventory(callback) {
    var ref = db.ref('Global Inventory Info');
    ref.once("value", function(snapshot) {
      console.log('TEST');
      callback(snapshot.val());
    });
  };
  
  
  static updateItem(user_id, item, itemCount) {
    var ob = {};
    ob[item] = itemCount;
   
    var ref = db.ref(user_id+'/'+item);
    if(itemCount>0)
      ref.set(itemCount);
    else ref.remove();
  };
  
  static overrideInventory(request, callback) {
    var ref = db.ref(request.user_id);
    ref.set(request.items);
    callback();
  }
  
  static updateInventory (request, callback) {
    FirebaseTools.getInventory(request.user_id, function(inventory) {
       for(var key in request.items)
        FirebaseTools.updateItem(request.user_id, key, request.items[key]);
       callback();
    });
  }
}

module.exports = FirebaseTools;