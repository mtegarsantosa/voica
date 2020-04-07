<template>
  <div>
    <div id="audio"></div>
    <div class="container">
      <h3 class="text-center">Jadwal Hari Ini</h3>
      <router-link :to="{name:'gLogin'}" class="btn btn-secondary btn-sm">ADMIN PANEL</router-link>
      <hr>
      <div class="row">
        <div v-for="(s,index) in scheduleNow" :key="index" class="col-md-3">
          <div class="m-2 p-3 bg-white rounded shadow-sm">
            Jam: <span class="text-danger">{{s.time_audio}}</span>
            <hr>
            <b>{{s.name_audio}}</b>
          </div>
        </div>
      </div>
      <div class="mt-5 text-danger">
        <b>Important Note!</b>:
        <ul>
          <li>
            Halaman ini membunyikan suara bel.
            Tetap buka halaman ini ketika aplikasi berjalan!
          </li>
        </ul>
      </div>
      <div class="text-center mt-5">
        <a href="https://arsan.dev" target="_blank" class="ml-2 mr-2">By: Arsan</a>
        <a href="https://blog.arsan.dev" target="_blank" class="ml-2 mr-2">My Personal Blog</a>
        <a href="https://teziger.blogspot.com" target="_blank" class="ml-2 mr-2">My Public Blog</a>
        <a href="https://git.arsan.dev" target="_blank" class="ml-2 mr-2">My Github</a>
        <a href="https://facebook.com/arsandev" target="_blank" class="ml-2 mr-2">My Facebook</a>
        <a href="https://instagramm.com/arsan.dev" target="_blank" class="ml-2 mr-2">My Instagram</a>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data() {
    return {
      scheduleNow:[],
      timeNow:'',
      socket:io('/')
    }
  },
  methods: {
    getScheduleNow(){
      let day = this.moment().format("E")
      this.axios(this.api+"/schedule/now?day="+day).then(res=>{
        this.scheduleNow = res.data
      }).then(()=>{
        setInterval(function(){
          this.timeNow = this.moment().format("H:mm")
          let check = this.scheduleNow.find(x => {
            return x.time_audio === this.timeNow
          })
          if (check) {
            this.$("#audio").html('<audio autoplay><source src="/audio/'+check.file+'"></audio>')
          }
        }.bind(this),30000)
      })
    }
  },
  mounted() {
    this.getScheduleNow()
    this.socket.on('RESET_BEL',()=>{
      this.getScheduleNow()
    })
  }
}
</script>
