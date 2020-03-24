<template>
  <div>
    {{scheduleNow}}
    {{moment().format("H:mm:s")}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      scheduleNow:[],
      timeNow:''
    }
  },
  methods: {
    getScheduleNow(){
      let day = this.moment().format("E")
      this.axios(this.api+"/schedule/now?day="+day).then(res=>{
        this.scheduleNow = res.data
      }).then(()=>{
        // setInterval(function(){
        //   this.timeNow = this.moment().format("H:mm")
        // }.bind(this),1000)
        // if (this.timeNow === '10:54') {
        //   alert()
        // }
      })
    }
  },
  mounted() {
    this.getScheduleNow()
  }
}
</script>
