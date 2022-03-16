<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-6">
        <div class="row mt-4">
          <div class="col-md-2">
            <label for="" class="mt-1">Username or email</label>
          </div>
          <div class="col-md-6">
            <input type="email" class="form-control" placeholder="Username or Email" v-model="username_email"/>
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
            <button class="btn btn-primary" @click="registerUser">Sign in</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SigninView",
  data() {
    return{
      username_email: "",
      password: "",
    }
  },
  methods: {
    registerUser: function() {

      axios.post("/api/signin", {
        username_email: this.username_email,
        password: this.password,
      }).then((res) => {
        if(res.data.msg === "Validation Failed"){
          let errors = res.data.errors;
          let errorMsg = "";
          if(errors.username_email.length != 0){
            for(let i=0; i<errors.username_email.length; i++){
              errorMsg += `${errors.username_email[i]}\n`;
            }
          }
          if(errors.password.length != 0){
            for(let i=0; i<errors.password.length; i++){
              errorMsg += `${errors.password[i]}\n`;
            }
          }
          alert(errorMsg);
        }
        else{
          alert("Successfully connected!");
        }

      }).catch(()=>{
        alert("Something Went Wrong");
      })
    }
  }
};
</script>
