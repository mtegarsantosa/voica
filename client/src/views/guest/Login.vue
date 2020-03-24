<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Masuk Ke Halaman Admin</h5>
              <form class="form-signin" @submit.prevent="login()" method="post">
                <div class="form-label-group mb-3">
                  <input type="text" ref="username" class="form-control" placeholder="Masukan username" required autofocus autocomplete="off">
                </div>
                <div class="form-label-group mb-3">
                  <input type="password" ref="password" class="form-control" placeholder="Masukan password" required>
                </div>
                <button class="btn btn-lg btn-primary btn-block text-uppercase" id="login" type="submit">Masuk</button>
              </form>
            </div>
          </div>
          <div class="text-center">(c) 2020 - Voica V1.0.0 <a target="_blank" href="https://arsan.dev">Arsan Dev</a></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login(){
      this.$("#login").attr("disabled","disabled")
      this.axios.post(this.api+"/user/login", {
        username:this.$refs.username.value,
        password:this.$refs.password.value
      }).then(res=>{
        if (res.data.status) {
          this.$cookies.set("voicaT",res.data.token)
          window.location = "/panel"
        }
        else {
          let type = res.data.type, msg
          if (type === "usernameNotExists") msg = "Username ini tidak ada"
          if (type === "wrongPass") msg = "Password salah"
          this.toastr.error(msg)
        }
        this.$("#login").removeAttr("disabled")
      })
    }
  },
  mounted() {

  }
}
</script>
