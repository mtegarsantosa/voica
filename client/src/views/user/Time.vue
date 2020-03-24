<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" id="newSchedule" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tambah Jadwal</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="submit()" method="post">
            <div class="modal-body">
              <select class="form-control" ref="label">
                <option value="">-PILIH LABEL AUDIO-</option>
                <option v-for="(l,index) in labels" :key="index" :value="l.id">{{l.name}}</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary"><i class="fa fa-plus"></i> Tambah</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <span class="text-danger">*klik hari untuk menambah jadwal</span>
    <hr>
    <table class="table table-bordered">
      <tr class="text-white bg-info text-center">
        <th v-for="(d,index) in days" class="pointer" @click="openModalEveryweek(index+1)">{{d}}</th>
      </tr>
      <tr>
        <th>
          <div v-for="(s,index) in schedules" :key="index" v-if="s.day == 1" class="alert alert-success p-2">
            <span class="badge badge-danger">{{s.time_audio}}</span> {{s.name_audio}}
          </div>
        </th>
        <th>
          <div v-for="(s,index) in schedules" :key="index" v-if="s.day == 2" class="alert alert-success p-2">
            <span class="badge badge-danger">{{s.time_audio}}</span> {{s.name_audio}}
          </div>
        </th>
        <th>
          <div v-for="(s,index) in schedules" :key="index" v-if="s.day == 3" class="alert alert-success p-2">
            <span class="badge badge-danger">{{s.time_audio}}</span> {{s.name_audio}}
          </div>
        </th>
        <th>
          <div v-for="(s,index) in schedules" :key="index" v-if="s.day == 4" class="alert alert-success p-2">
            <span class="badge badge-danger">{{s.time_audio}}</span> {{s.name_audio}}
          </div>
        </th>
        <th>
          <div v-for="(s,index) in schedules" :key="index" v-if="s.day == 5" class="alert alert-success p-2">
            <span class="badge badge-danger">{{s.time_audio}}</span> {{s.name_audio}}
          </div>
        </th>
        <th>
          <div v-for="(s,index) in schedules" :key="index" v-if="s.day == 6" class="alert alert-success p-2">
            <span class="badge badge-danger">{{s.time_audio}}</span> {{s.name_audio}}
          </div>
        </th>
        <th>
          <div v-for="(s,index) in schedules" :key="index" v-if="s.day == 7" class="alert alert-success p-2">
            <span class="badge badge-danger">{{s.time_audio}}</span> {{s.name_audio}}
          </div>
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timezone:'',
      labels:[],
      mode:'1',
      selectedDay:'',
      schedules:[],
      days: ["SENIN","SELASA","RABU","KAMIS","JUM\'AT","SABTU","MINGGU"]
    }
  },
  methods: {
    getSchedules(){
      this.axios.get(this.api+'/schedule').then(res=>{
        this.schedules = res.data
      })
    },
    submit(){
      var payload
      if (this.mode == 1) {
        payload = {
          id_label: this.$refs.label.value,
          time: this.selectedDay,
          status: "everyweek"
        }
      }
      else if (this.mode == 2) {
        payload = {
          id_label: this.$refs.label.value,
          time: this.selectedDay,
          status: "one"
        }
      }
      this.axios.post(this.api+"/schedule?token="+this.token,payload).then(res=>{
        if (res.data.status) {
          this.toastr.success("Berhasil menambah jadwal baru!")
          this.$("#newSchedule").modal("hide")
        }
        else this.toastr.error("Terjadi kesalahan!")
      }).then(()=>{
        this.getSchedules()
      })
    },
    getLabels(){
      this.axios.get(this.api+"/label?order=name&c=A&token="+this.token).then(res=>{
        this.labels = res.data
      })
    },
    changeTimezone(e){
      this.axios.put(this.api+"/user/changeTimezone?token="+this.token,{
        timezone:e.target.value
      }).then(res=>{
        if (res.data.status) {
          this.toastr.success("Berhasil mengubah zona waktu")
        }
        else{
          this.toastr.error("Terjadi kesalahan!")
        }
      })
    },
    openModalEveryweek(day){
      this.$("#newSchedule").modal("show")
      this.mode = 1
      this.selectedDay = day
    },
    getTimeZone(){
      this.axios.get(this.api+'/user/checkTimezone?token='+this.token).then(res=>{
        this.timezone = res.data.timezone
      })
    }
  },
  mounted(){
    this.getSchedules()
    this.getTimeZone()
    this.getLabels()
  }
}
</script>
<style scoped>
  .pointer{
    cursor: pointer;
  }
</style>
