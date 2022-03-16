<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Name</label>
          </div>
          <div class="col-md-4">
            <input type="text" class="form-control" v-model="username" placeholder="Username" />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Email</label>
          </div>
          <div class="col-md-6">
            <input type="email" class="form-control" placeholder="Email" v-model="email"/>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Password</label>
          </div>
          <div class="col-md-6">
            <input type="password" class="form-control" placeholder="Password" v-model="password" />
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Password confirmation</label>
          </div>
          <div class="col-md-6">
            <input type="password" class="form-control" placeholder="Password confirmation" v-model="passwordconfirm"/>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-2">
            <button class="btn btn-primary" @click="registerUser">Register</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SignupView",
  data() {
    return{
      username: "",
      email: "",
      password: "",
      passwordconfirm: "",
    }
  },
  methods: {
    registerUser: function() {

      axios.post("/api/signup", {
        username: this.username,
        email: this.email,
        password: this.password,
        passwordconfirm: this.passwordconfirm,
      }).then((res) => {
        if(res.data.msg === "Validation Failed"){
          let errors = res.data.errors;
          let errorMsg = "";
          if(errors.username.length != 0){
            for(let i=0; i<errors.username.length; i++){
              errorMsg += `${errors.username[i]}\n`;
            }
          } 

          if(errors.email.length != 0){
            for(let i=0; i<errors.email.length; i++){
              errorMsg += `${errors.email[i]}\n`;
            }
          }

          if(errors.password.length != 0){
            for(let i=0; i<errors.password.length; i++){
              errorMsg += `${errors.password[i]}\n`;
            }
          }

          if(errors.passwordconfirm.length != 0){
            for(let i=0; i<errors.passwordconfirm.length; i++){
              errorMsg += `${errors.passwordconfirm[i]}\n`;
            }
          }
          if(errors.register.length != 0){
            for(let i=0; i<errors.register.length; i++){
              errorMsg += `${errors.register[i]}\n`;
            }
          }

          alert(errorMsg);
        }
        else{
          alert("Successfully Saved");
        }

      }).catch(()=>{
        alert("Something Went Wrong");
      })
    }
  }
};
</script>

<style scoped>
img {
  height: 500px;
}
</style>
