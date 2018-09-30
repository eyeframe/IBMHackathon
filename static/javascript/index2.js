vm = new Vue({
    el: "#app",
    data: {
        name: "asdf",
        map: '',
        markerData: [],
        marker: '',
        InfoWindow: '',
        notification: false,
        messages: [],
        inputText: '',
        notifications:[],
        textInput:'',
        notiHide:true,
    },
    methods: {
        async initMap() {
            const m = {
                lat: 22.877000,
                lng: 71.861800
            }
            this.geocoder = new google.maps.Geocoder();
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: m,
                zoom: 10
            });
            this.InfoWindow = new google.maps.InfoWindow({});

            this.getCodeRecursive(0, true);

        },
        getCodeRecursive(i, center) {

            if (i > this.markerData.length-2)
                return;
            let el = this.markerData[i];
            const info = `<strong>${el['Address']}</strong><br>${el['Building Use']}<br>Preliminary Risk Category: <strong>${el['Preliminary Risk Category']}</strong><br>`
            this.getGeocode({lat:Number(el['lattitude']),lng:Number(el['longitude'])}, info, center);
            setTimeout(() => {
                this.getCodeRecursive(++i, false)
            }, 0);
        },
        async mapElementCreate() {
            const google = document.querySelector("#google");
            const script = document.createElement('script');
            let key = '';
            fetch("/getApiKey")
                .then(res => res.json())
                .then(res => {
                    key = res.key;
                    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAqDjBpxPeqk6BgG1DehAMKPazEcuO2DzA&callback=vm.initMap`;
                    script.async = true;
                    script.defer = true;
                    google.appendChild(script);
                })
                .catch(err => console.log(err));


        },
        getMarkerData() {
            fetch('/static/data/BuildingData2.csv')
                .then(res => res.text())
                .then(res => {
                    this.csvParser(res);
                    
                })
                .catch(e => {
                    console.log(e);
                })
        },
        async csvParser(csv) {
            let res = [];
            let line = csv.split('\n');
            let headers = line[0].split(',');

            for (let i = 1; i < line.length; i++) {
                let obj = {};
                let currentLine = await line[i].split(',');
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentLine[j];
                }
                res.push(obj);
            }
            this.markerData = (res);
        },
        async getGeocode(latlng, info, center) {
            if (center) {
                this.map.setCenter(latlng);
            }
            this.createMarker(latlng, info);
        },
        createMarker(latlng, info) {
            let url;
            if (info.indexOf('Medium Risk') != -1) {
                url = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
            } else if (info.indexOf('High Risk') != -1) {
                url = "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
            } else {
                url = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
            }
            let marker = new google.maps.Marker({
                position: latlng,
                map: this.map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                icon: {
                    url
                }
            });
            google.maps.event.addListener(marker, 'mouseover', () => {
                this.InfoWindow.setContent(info);
                this.InfoWindow.open(this.map, marker);
            });
            google.maps.event.addListener(marker, 'mouseout', () => {
                this.InfoWindow.close();
            });
        },
        redirect(url) {
            window.location.href = "/services";
        },
        send(method) {
            let param = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                }
            }
            if (method === 'sms') {
                param.body = JSON.stringify({
                    sms: this.inputText
                });
                fetch('/python/sms', param)
                    .then(res => res.json())
                    .then(res => {
                        this.prediction = res.data;
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            } else {
                param.body = JSON.stringify({
                    email: this.inputText
                });
                fetch('/python/email', param)
                    .then(res => res.json())
                    .then(res => {
                        this.prediction = res.data;
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
        getMessages() {
            fetch('/message')
                .then(res => res.json())
                .then(res => {
                    this.messages = res.data;
                })
                .catch(e => {
                    console.log(e);
                })
            console.log(this.messages);
        },
        readAlerts(){
            fetch('/alert')
                .then(res=>res.json())
                .then(res=>{
                    for(let x in res){
                        let data = `${x} : ${res[x]}`;
                        this.notifications.push(data);
                    }
                })
                .catch(e=>console.log(e));
        },
    },
    beforeCreate() {
        this.$nextTick = function () {
            this.initMap();
        };
    },
    created() {
        this.getMarkerData();
    },
    beforeMount() {
        this.mapElementCreate();
        this.getMessages();
        this.readAlerts();
    },

});