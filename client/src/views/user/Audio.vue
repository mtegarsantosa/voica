<template>
  <div>
    <div id="audioPreview"></div>
    <!-- Modal Edit Audio -->
    <div class="modal fade" id="editAudio" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Audio</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="editAudio(indexEditAudioTriggered.id)" enctype="multipart/form-data" method="post">
            <input type="file" @change="selectAudio" style="display:none;" id="fileAudioEdit" accept="audio/*">
            <div class="modal-body">
              <label for="fileAudioEdit" class="w-100">
                <div class="audio upload">
                  <div style="font-size:70px;"><i class="fa fa-upload"></i></div>
                  Upload File Audio
                  <br>
                  <span class="text-danger">* kosongkan file bila tidak ingin diubah</span>
                </div>
              </label>
              <div class="alert alert-success" v-if="selectedAudio">File audio telah dipilih!</div>
              <input type="text" ref="editAudioName" class="form-control" :value="indexEditAudioTriggered.name" autocomplete="off" placeholder="masukan judul audio">
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Modal Edit Audio -->
    <div class="row">
      <div class="col-md-12" v-if="audios.length < 1">
        <div class="alert alert-warning">
          <i class="fa fa-exclamation-triangle"></i>: Anda belum menunggah audio sama sekali!
        </div>
      </div>
      <div class="col-md-2">
        <form method="post" enctype="multipart/form-data"><input type="file" @change="selectAudio" style="display:none;" id="fileAudio" accept="audio/*"></form>
        <label for="fileAudio" class="w-100">
          <div class="audio upload">
            <div style="font-size:70px;"><i class="fa fa-upload"></i></div>
            Upload File Audio
          </div>
        </label>
      </div>
      <div class="col-md-2" v-if="audios[0] === 'default'">
        <div class="audio exists">
          <h1 class="pt-5"><i class="fa fa-spinner fa-spin"></i></h1>
        </div>
      </div>
      <div v-if="audios[0] !== 'default'" class="col-md-2" v-for="(audio,index) in audios" :key="index">
        <div class="audio exists">
          <div class="text-right">
            <a href="javascript:" class="text-danger" @click="remove(audio.id)"><i class="fa fa-times"></i></a>
          </div>
          <div class="title text-secondary"><b>{{audio.name}}</b></div>
          <div class="row">
            <div class="col">
              <a @click="editAudioTriggered(index)" href="javascript:" data-toggle="modal" data-target="#editAudio" class="text-info"><i class="fa fa-edit"></i> Edit</a>
            </div>
            <div class="col">
              <a href="javascript:" @click="preview(audio.file)" class="text-success"><i class="fa fa-volume-up"></i> Dengar</a>
            </div>
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
      audios: ["default"],
      selectedAudio:'',
      indexEditAudioTriggered:""
    }
  },
  methods: {
    getAudios(){
      this.axios.get(this.api+"/audio?token="+this.token).then(res=>{
        this.audios = res.data
      })
    },
    selectAudio(e){
      let file = e.target.files[0]
      let splitAudioType = file.type.split('/')
      if (splitAudioType[0] === "audio") {
        this.selectedAudio = file
        if (!this.indexEditAudioTriggered) {
          this.swal("Masukan Judul Audio:", {
            content: "input",
          })
          .then((value) => {
            if (value == null) {
              this.selectedAudio = ""
              this.swal("Gagal","Audio gagal diunggah (tidak ada nama)", "warning")
            }
            else{
              const fd = new FormData()
              fd.append("audio", this.selectedAudio)
              fd.append("name", value)
              this.axios.post(this.api+"/audio?token="+this.token ,fd).then(res=>{
                if (res.data.status) {
                  this.swal("Berhasil","Audio telah diunggah", "success")
                  this.getAudios()
                }
                else this.toastr.error("Terjadi kesalahan!")
                this.selectedAudio = ""
              })
            }
          })
        }
      }
      else this.toastr.error("File yang diupload harus berupa audio!")
    },
    preview(url){
      this.$("#audioPreview").html('<audio autoplay><source src="/audio/'+url+'"></audio>')
      this.swal({
        title: "Audio sedang dimainkan.",
        text: "klik tombol selesai untuk mengakhiri audio",
        button: "Selesai"
      })
      .then(() => {
        this.$("#audioPreview").html('')
      });
    },
    remove(id){
      this.swal({
        title: "Hapus audio ini?",
        text: "Ini akan menghapus jadwal yang menggunakan audio ini",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.axios.delete(this.api+"/audio/"+id+"?token="+this.token).then(res=>{
            if (res.data.status) {
              this.swal("Berhasil!", "Audio berhasil dihapus!", "success")
              this.getAudios()
            }
            else this.toastr.error("Terjadi kesalahan!")
          })
        }
      })
    },
    editAudioTriggered(index){
      this.indexEditAudioTriggered = this.audios[index]
    },
    editAudio(id){
      const fd = new FormData()
      fd.append("audio", this.selectedAudio)
      fd.append("name", this.$refs.editAudioName.value)
      this.axios.put(this.api+"/audio/"+id+"?token="+this.token,fd).then(res=>{
        if (res.data.status) {
          this.swal("Berhasil!","Audio berhasil diperbarui!","success")
        }
        else this.toastr.error("Terjadi kesalahan!")
        this.getAudios()
        this.$("#editAudio").modal("hide")
        this.selectedAudio = ""
        this.indexEditAudioTriggered = ""
      })
    }
  },
  mounted(){
    this.getAudios()
  }
}
</script>

<style scoped>
  .aaudio, .audio a{
    text-decoration: none;
  }
  .audio{
    width: 100%;
    max-height: 170px;
    overflow: hidden;
    height: 170px;
    background: #FFF;
    padding: 0 10px 10px 10px;
    text-align: center;
    border-radius:8px;
  }
  .audio .title{
    max-height: 100px;
    height: 100px;
    overflow: hidden;
  }
  .upload{
    background: none;
    border-style: dashed;
    color: #a8a8a8;
    cursor: pointer;
  }
  .exists{
    background: #FFF;
    color: #8f8f8f;
    transition: box-shadow 0.1s, transform 0.1s;
  }
  .exists:hover{
    box-shadow: 0 0 15px #DDD;
    transform: scale(1.05);
  }
</style>
