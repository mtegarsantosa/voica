<template>
  <div>
    <div id="audioPreview"></div>
    <h3 class="m-0">Label: <b>{{label.name}}</b></h3>
    <hr>
    <div class="row">
      <div class="col-md-5">
        <b>Audio</b>
      </div>
      <div class="col-md-3">
        <b>Atur Jam</b>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5">
        <select class="form-control" v-model="audioTrigger">
          <option value="">-PILIH AUDIO-</option>
          <option v-for="(a,index) in audios" :key="index" :value="{id:a.id,file:a.file}">{{a.name}}</option>
        </select>
      </div>
      <div class="col-md-3">
        <input type="time" class="form-control" ref="time">
      </div>
      <div class="col-md-4">
        <button class="btn btn-warning btn-sm mr-2" @click="preview()">Dengar</button>
        <button class="btn btn-primary btn-sm" @click="create()">Tambah</button>
      </div>
    </div>

    <table class="table table-hover text-center mt-3">
      <thead>
        <tr>
          <th>No</th>
          <th>Audio</th>
          <th>Jam</th>
          <th>Opsi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(al,index) in audiosLabel" :key="index">
          <td>{{index+1}}</td>
          <td>{{al.name}}</td>
          <td>{{al.time}}</td>
          <td>
            <button class="btn btn-warning btn-sm" @click="preview2(al.file)">Dengar</button>
            <button class="btn btn-danger btn-sm" @click="remove(al.id)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      label:'',
      audios:[],
      audiosLabel:[],
      audioTrigger:''
    }
  },
  methods: {
    remove(id){
      this.swal({
        title: "Hapus audio ini?",
        text: "Ini hanya akan menghapus audio dari label",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.axios.delete(this.api+"/labelAudio/"+id+"?token="+this.token).then(res=>{
            if (res.data.status) {
              this.toastr.success("Berhasil menghapus audio pada label "+this.label.name)
              this.getAudioByLabel()
            }
            else this.toastr.error("Terjadi kesalahan!")
          })
        }
      })
    },
    getAudioByLabel(){
      this.axios.get(this.api+"/labelAudio/"+this.$route.params.id+"?token="+this.token).then(res=>{
        this.audiosLabel = res.data
      })
    },
    create(){
      this.axios.post(this.api+"/labelAudio?token="+this.token,{
        id_audio: this.audioTrigger.id,
        id_label: parseInt(this.$route.params.id),
        time: this.$refs.time.value
      }).then(res=>{
        if (res.data.status) {
          this.toastr.success("Berhasil menambah audio pada label "+this.label.name)
          this.getAudioByLabel()
        }
        else this.toastr.error("Terjadi kesalahan!")
      })
    },
    preview(){
      if (this.audioTrigger) {
        this.$("#audioPreview").html('<audio autoplay><source src="/audio/'+this.audioTrigger.file+'"></audio>')
        this.swal({
          title: "Audio sedang dimainkan.",
          text: "klik tombol selesai untuk mengakhiri audio",
          button: "Selesai"
        })
        .then(() => {
          this.$("#audioPreview").html('')
        })
      }
      else{
        this.swal("Tidak bisa mendengarkan audio","Audio belum dipilih!","warning")
      }
    },
    preview2(file){
      this.$("#audioPreview").html('<audio autoplay><source src="/audio/'+file+'"></audio>')
      this.swal({
        title: "Audio sedang dimainkan.",
        text: "klik tombol selesai untuk mengakhiri audio",
        button: "Selesai"
      })
      .then(() => {
        this.$("#audioPreview").html('')
      })
    },
    ready(){
      this.axios.get(this.api+"/label/"+this.$route.params.id+"?token="+this.token).then(res=>{
        this.label = res.data
      })
      this.axios.get(this.api+"/audio/?order=name&c=A&token="+this.token).then(res=>{
        this.audios = res.data
      })
    }
  },
  mounted() {
    this.ready()
    this.getAudioByLabel()
  }
}
</script>
