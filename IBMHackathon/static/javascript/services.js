new Vue({
    el:'#app',
    data:{
        image:[],
        imageIndex:[],
        structure:false,
        prediction:[],
        submitted:-1,
    },
    methods:{
        redirect(url){
            window.location.href = url;
        },
        selectedImage(name,index){

            if(!this.structure){
                if(this.imageIndex[index]){
                    this.imageIndex[index] = false;
                    this.image = [];
                }else{
                    for(let i = 0;i < 26; i++){
                        this.imageIndex[i] = false;
                    }
                    this.image = [];
                    this.image.push(name);
                    this.imageIndex[index] = true;
                }
            }else{
                let f = 0;
                for(let x in this.imageIndex){
                    if(this.imageIndex[x]){
                        f++;
                    }
                }
                if(f >= 2){
                    for(let i = 0;i < 26; i++){
                        this.imageIndex[i] = false;
                        this.image = [];
                    }
                }else{
                    this.image.push(name);
                    this.imageIndex[index] = true; 
                }
            }
            console.log(name);
        },
        submit(index){
            this.prediction = '';
            let param ={
                method:'POST',
                body:JSON.stringify(this.image),
                headers:{
                    'Content-type':'application/json'
                }
            }
            this.submitted = index;
            fetch('/python',param)
                .then(res=>res.json())
                .then(res=>{
                    this.prediction = res.data;
                })
                .catch((e)=>{
                    console.log(e);
                });
            console.log(this.prediction);
        }
    },
    beforeMount() {
        for(let i = 0;i < 26; i++){
            this.imageIndex.push(false);
        }
    },watch:{}
});