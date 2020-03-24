<template>
  <div>
    <div id="audiotest"></div>
    <div class="row">
      <div class="col-md-5">
        <div class="bg-white rounded shadow p-3">
          <b style="font-size:20px" class="text-info">Jadwal Hari Ini</b>
          <ul>
            <li v-for="(s,index) in scheduleNow" :key="index">
              <div class="alert alert-success p-2">- <span class="badge badge-danger">{{s.time_audio}}</span> {{s.name_audio}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-7">
        <div class="row">
          <div class="col-sm-4">
            <div class="card">
              <div class="p-3 bg-info">
                <h5 class="card-title text-light">Total Audio</h5>
              </div>
              <div class="card-body">
                <h1 class="float-left text-secondary"><i class="fa fa-volume-up"></i></h1>
                <h1 class="card-text float-right">7</h1>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="p-3 bg-warning">
                <h5 class="card-title text-light">Total Label</h5>
              </div>
              <div class="card-body">
                <h1 class="float-left text-secondary"><i class="fa fa-tags"></i></h1>
                <h1 class="card-text float-right">2</h1>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="p-3 bg-success">
                <h5 class="card-title text-light">Total Jadwal</h5>
              </div>
              <div class="card-body">
                <h1 class="float-left text-secondary"><i class="fa fa-clock"></i></h1>
                <h1 class="card-text float-right">3</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-2 text-center">
          <a href="javascript:" @click="audioTest()" class="btn btn-secondary w-25 mr-3"><i class="fa fa-volume-up"></i> Test Suara</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scheduleNow:[]
    }
  },
  methods: {
    audioTest(){
      this.$("#audiotest").html('<audio autoplay><source src="/audio/test.mp3"></audio>')
    },
    getScheduleNow(){
      let day = this.moment().format("E")
      this.axios(this.api+"/schedule/now?day="+day).then(res=>{
        this.scheduleNow = res.data
      })
    }
  },
  mounted() {
    this.getScheduleNow()
  }
}
</script>
<style scoped>
  ul{
    margin: 0;
    list-style: none;
    padding: 10px 0;
  }
</style>
