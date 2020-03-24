<template>
  <div>
    <button class="btn btn-primary" @click="titleLabel()"><i class="fa fa-plus"></i> Tambah Label Audio</button>
    <table class="text-center table table-hover mt-3">
      <thead>
        <tr class="bg-info">
          <th class="text-white">No</th>
          <th class="text-white" width="600">Judul Label</th>
          <th class="text-white">Opsi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(l,index) in labels" :key="index">
          <td>{{index+1}}</td>
          <td>{{l.name}}</td>
          <td>
            <button class="btn btn-success btn-sm" @click="detail(l.id)">Detail</button> |
            <button class="btn btn-warning btn-sm" @click="edit(l.id)">Edit</button> |
            <button class="btn btn-danger btn-sm" @click="remove(l.id)">Hapus</button>
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
      labels: []
    }
  },
  methods: {
    edit(id){
      this.swal("Masukan Judul Label Baru:", {
        content: "input",
      })
      .then((value) => {
        if (value) {
          this.axios.put(this.api+"/label/"+id+"?token="+this.token,{
            name:value
          }).then(res=>{
            if (res.data.status) {
              this.toastr.success("Judul label telah diubah")
              this.getLabels()
            }
            else{
              this.toastr.error("Terjadi kesalahan!")
            }
          })
        }
      })
    },
    remove(id){
      this.swal({
        title: "Hapus label ini?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.axios.delete(this.api+"/label/"+id+"?token="+this.token).then(res=>{
            if (res.data.status) {
              this.toastr.success("Berhasil menghapus label")
              this.getLabels()
            }
            else this.toastr.error("Terjadi kesalahan!")
          })
        }
      })
    },
    getLabels(){
      this.axios.get(this.api+"/label?token="+this.token).then(res=>{
        this.labels = res.data
      })
    },
    detail(id){
      this.$router.push({name:"uDetailLabel",params:{id:id}})
    },
    titleLabel(){
      this.swal("Masukan Judul Label:", {
        content: "input",
      })
      .then((value) => {
        if (value) {
          this.axios.post(this.api+"/label?token="+this.token,{
            name:value
          }).then(res=>{
            if (res.data.status) {
              this.toastr.success("Label audio telah ditambah")
              this.getLabels()
            }
            else{
              this.toastr.error("Terjadi kesalahan!")
            }
          })
        }
      })
    }
  },
  mounted() {
    this.getLabels()
  }
}
</script>
