<template>
  <div>
    <div class="wrapper">
      <div class="main-header">
        <div class="logo-header">
          <router-link :to="{name:'uDashboard'}" class="logo">
            VOICA V1
          </router-link>
          <button class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="fa fa-list"></span>
          </button>
          <button class="more text-danger" @click="logout()"><i class="fa fa-sign-out"></i></button>
        </div>
        <nav class="navbar navbar-header navbar-expand-lg pt-1">
          <div class="container-fluid text-center">
            <ul class="navbar-nav topbar-nav ml-md-auto align-items-center">
              <li class="nav-item dropdown">
                <a @click="logout()" href="javascript:" class="btn btn-danger text-white"> Keluar </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="sidebar">
        <div class="scrollbar-inner sidebar-wrapper">
          <div class="user">
            <div class="photo">
              <img src="/img/user/default.png">
            </div>
            <div class="info">
              <a class="" data-toggle="collapse" href="javascript:" aria-expanded="true">
                <span>
                  <span class="user-level">ADMINISTRATOR</span>
                  <span><i>ArsanDev</i></span>
                </span>
              </a>
              <div class="clearfix"></div>
            </div>
          </div>
          <ul class="nav">
            <b class="text-dark ml-3">Menu</b>
            <li class="nav-item">
              <router-link :to="{name:'uDashboard'}">
                <i class="fa fa-user"></i>
                <p>Beranda</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name:'uAudio'}">
                <i class="fa fa-volume-up"></i>
                <p>Manajemen Audio</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name:'uLabel'}">
                <i class="fa fa-tags"></i>
                <p>Label Audio</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name:'uTime'}">
                <i class="fa fa-clock"></i>
                <p>Jadwal</p>
              </router-link>
            </li>
            <hr>
            <b class="text-dark ml-3">Konfigurasi</b>
            <li class="nav-item">
              <router-link :to="{name:'uAccount'}">
                <i class="fa fa-user"></i>
                <p>Akun</p>
              </router-link>
            </li>
            <hr>
            <b class="text-dark ml-3">Info</b>
            <li class="nav-item">
              <router-link :to="{name:'uAbout'}">
                <i class="fa fa-user"></i>
                <p>Tentang</p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-panel">
        <div class="content">
          <div class="container-fluid">
            <router-view :user="dataUser"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataUser:""
    }
  },
  methods: {
    checkUser(){
      this.axios.get(this.api+"/jwt/verify?token="+this.token).then(res=>{
        this.dataUser = res.data
      }).catch(err=>{
        let jwtErrName = err.response.data.status
        if (!jwtErrName) {
          this.logout()
        }
      })
    },
    logout(){
      this.$cookies.remove("voicaT")
      window.location = "/masuk"
    }
  },
  beforeMount() {
    this.checkUser()
    // this.io.on("asd", (data)=>{
    //   console.log(data)
    // })
  },
  mounted(){

  }
}
</script>
