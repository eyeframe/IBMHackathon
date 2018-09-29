vm = new Vue({
    el: "#app",
    data: {
        name: "",
        map: "",
        cover: [false, false, false, false],
        weatherData: {},
        hide: [false, false, false, false],
        icons: [],
        weatherForecast: [],
        nightDay:[true,true,true],
    },
    methods: {
        initMap() {
            const m = {
                lat: 22.877000,
                lng: 71.861800
            }
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: m,
                zoom: 10
            });

            let marker = new google.maps.Marker({
                position: m,
                map: this.map
            });
        },
        async mapElementCreate() {
            const google = document.querySelector("#google");
            const script = document.createElement('script');
            let key = '';
            // fetch("/getApiKey")
            //     .then(res=> res.json())
            //     .then(res=>{
            //         key = res.key;
            //     })
            //     .catch(err=>console.log(err));
            script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=vm.initMap`;
            script.async = true;
            script.defer = true;
            google.appendChild(script);
        },
        async initWeather() {
            fetch('/getCurrentWeather')
                .then(res => res.json())
                .then(res => {
                    for (const key in res) {
                        if (res.hasOwnProperty(key)) {
                            this.weatherData[key] = res[key];
                        }
                    }
                })
                .catch(e => console.log(e));
            fetch('/static/data/icons.json')
                .then(res => res.json())
                .then(res => {
                    let i = 0;
                    for (const key in res) {
                        this.icons[i++] = res[key];
                    }
                })
                .catch(e => console.log(e));
            let ob = [];
            fetch('/getWeatherForecast')
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    for (let i = 0; i < 5; i+=2) {
                        let obj = {};
                        for (const key in res) {
                            if (res.hasOwnProperty(key)) {
                                if(key === 'daypart'){
                                    const temp = res[key][0];
                                    for (const k in temp) {
                                        if (temp.hasOwnProperty(k)) {
                                            obj[k] = [temp[k][i],temp[k][i + 1]];
                                        }
                                    }
                                    continue;
                                }
                                obj[key] = res[key][i];
                            }
                        }
                        ob.push(obj);
                    }

                    this.weatherForecast = ob;
                    // console.log(this.weatherForecast)
                })
                .catch(e => console.log(e));
        },
        weatherType(code) {
            code = typeof(code) === 'number'?code:44;
            return `/static/images/${code}.svg`;
        },
        coverToggle(index, toggle) {
            Vue.set(this.cover, index, toggle);
            this.remove(index, !toggle);
        },
        remove(index, type = false) {
            if (!type) {
                for (let i = 0; i < 4; i++) {
                    if (i !== index) {
                        Vue.set(this.hide, i, true);
                    } else {
                        Vue.set(this.hide, i, false);
                    }
                }
            } else {
                for (const i in this.hide) {
                    Vue.set(this.hide, i, false);
                }
            }
        },
        nightDaySetter(index){
            Vue.set(this.nightDay,index,!this.nightDay[index]);
        },
        // send(){
        //     let param ={
        //         method:'POST',
        //         headers:{
        //             'Content-type':'application/json'
        //         },
        //         body:JSON.stringify({email:textInput})
        //     }
        //     fetch('/python/email',param)
        //         .then(res=>console.log(res.text()))
        //         .catch(e=>console.log(e));
        // }
    },
    beforeCreate() {
        this.$nextTick = function () {
            this.initMap();
        };

    },
    beforeMount() {
        this.mapElementCreate();
    },
    created() {
        this.initWeather();
    },
    watch: {
        cover() {}
    }

});