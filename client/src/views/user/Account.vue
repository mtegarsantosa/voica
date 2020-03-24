<template>
  <div>
    <form @submit.prevent="changeUsername()" method="post">
      <input type="text" class="form-control" ref="username" placeholder="masukan username" :value="user.username">
      <div class="text-right">
        <button type="submit" class="btn btn-success btn-sm"><i class="fa fa-edit"></i> Ubah Username</button>
      </div>
    </form>
    <hr>
    <form @submit.prevent="changePassword()" method="post">
      <input type="password" ref="oldPassword" placeholder="masukan password lama" class="form-control">
      <input type="password" ref="newPassword" placeholder="masukan password baru" class="form-control">
      <input type="password" ref="confirmPassword" placeholder="konfirmasi password baru" class="form-control">
      <div class="text-right">
        <button type="submit" class="btn btn-info btn-sm"><i class="fa fa-edit"></i> Ubah Password</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props:["user"],
  methods: {
    changeUsername(){
      this.axios.post(this.api+"/user/changeUsername?token="+this.token,{
        username: this.$refs.username.value
      }).then(res=>{
        if (res.data.status) {
          this.swal("Berhasil!","Berhasil mengubah username! Anda diharuskan login kembali","success")
          this.$cookies.remove("voicaT")
          window.location = "/masuk"
        }
        else{
          this.toastr.error("Terjadi kesalahan!")
        }
      })
    },
    changePassword(){
      this.axios.post(this.api+"/user/changePassword?token="+this.token,{
        oldPassword: this.$refs.oldPassword.value,
        newPassword: this.$refs.newPassword.value,
        confirmPassword: this.$refs.confirmPassword.value
      }).then(res=>{
        if (res.data.status) {
          this.swal("Berhasil!","Berhasil mengubah password!","success")
        }
        else{
          let type = res.data.type
          if (type === "passNotSame") {
            this.toastr.warning("Password konfirmasi tidak sama")
          }
          if (type === "server") {
            this.toastr.error("Terjadi kesalahan!")
          }
          if (type === "wrongPass") {
            this.toastr.warning("Password lama salah!")
          }
        }
      })
    }
  }
}
</script>
<style scoped>
  input{
    margin: 5px 0;
  }
</style>
