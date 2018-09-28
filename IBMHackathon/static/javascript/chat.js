let vm = new Vue({
    el: "#app",
    data: {
        formHide: false,
        messages: [],
        currentUser: 'amit',
        user_id: '',
        items: [],
        item: '',
    },
    methods: {
        login(type = false) {
            window.location.href = "https://join.slack.com/t/emergencychatroom/shared_invite/enQtNDQxNjY2Nzk0NDUzLWNkOTVjYzAzNDNjY2E1YTgyZDM1NGQyYjZkZGI5OTYxYzZmYzkyMmQ1NmU1Njc3MWZlNzMxNzcyYWZlYTUzM2E";
        },
        parseInput() {
            let obj = {
                show: true,
            };
            let text = this.item;
            let textArray = text.split(':');
            textArray.forEach(element => {
                element.trim();
            });
            if (textArray.length == 1 || typeof (textArray[1]) !== 'string' || textArray[1] === '') {
                obj.name = textArray[0];
                obj.amount = 0;
            } else {
                obj.name = textArray[0];
                obj.amount = textArray[1];
            }
            this.items.push(obj);
            this.item = '';
        },
        deleteItem(index) {
            this.items[index].show = false;
            setTimeout(() => {
                this.items.splice(index, 1);
            }, 300);
        },
        uploadInventory() {
            if (this.user_id === '' || !(this.items.length > 0))
                return;
            let user_id = this.user_id;
            let items = {};

            this.items.forEach(el => {
                items[el.name] = el.amount;
            });
            
            // console.log(items);

            let param = {
                method: 'POST',
                body: JSON.stringify({
                    user_id,
                    items,
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            }
            fetch('/updateInventory', param)
                .then(res => res.text())
                .then(res => {
                    console.log(res);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        async validate() {
            if (this.user_id !== '') {
                this.formHide = true;
            }
            let param = {
                method: 'POST',
                body: JSON.stringify({
                    user_id:this.user_id
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            }
            fetch('/fetch_inventory', param)
                .then(res => res.json())
                .then(res => {
                    for(var key in res) {
                        let obj = {};
                        obj.name = key;
                        obj.amount = res[key];
                        obj.show = true;
                        this.items.push(obj);
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    },
    watch: {}
});