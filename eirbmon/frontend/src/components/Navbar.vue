<template>
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500&family=Lato:wght@700&display=swap" rel="stylesheet">
    </head>
    <body>
        <header :class="{'scrolled-nav':scrolledNav}">
            <nav>
                <div class="branding">
                    <router-link to="/" class="title">Eirbmon.</router-link>
                </div>
                <ul v-show="!mobile" class="navigation">
                    <li><a class="link" href="https://www.google.fr">Play</a></li>
                    <li><router-link  to="/marketplace" class="link">Marketplace</router-link></li>
                    <li><router-link  to="/eirbmon" class="link">eirbmon</router-link></li>
                    <li><router-link  to="/signup" class="link">Sign Up</router-link></li>
                    <li><router-link  to="/signin" class="link">Sign In</router-link></li>
                </ul>
                <div class="icon">
                    <img @click="toggleMobileNav" src="../assets/bars.png" v-show="mobile" class="i" :class="{'icon-active':mobileNav}">
                </div>
                <transition name="mobile-nav">
                    <ul v-show="mobileNav" class="dropdown-nav">
                        <li><router-link @click="toggleMobileNav" to="/play" class="link">Play</router-link></li>
                        <li><router-link @click="toggleMobileNav" to="/marketplace" class="link">Marketplace</router-link></li>
                        <li><router-link @click="toggleMobileNav" to="/eirbmon" class="link">eirbmon</router-link></li>
                        <li><router-link @click="toggleMobileNav" to="/signup" class="link">Sign Up</router-link></li>
                        <li><router-link @click="toggleMobileNav" to="/signin" class="link">Sign In</router-link></li>
                    </ul>
                </transition>
            </nav>
        </header>
    </body>
</template>

<script>
export default {
  name: 'NavBar',
  data(){
    return{
      scrolledNav:null,
      mobile:null,
      mobileNav:null,
      windowWidth:null,
    };
  },
  created(){
    window.addEventListener('resize',this.checkScreen);
    this.checkScreen();
  },
  mounted(){
    window.addEventListener('scroll',this.updateScrolls)
  },
  methods:{
    toggleMobileNav(){
      this.mobileNav=!this.mobileNav;
    },

    updateScroll(){
      const scrollPosition=window.scrollY;
      if(scrollPosition>50){
        this.scrolledNav=true;
        return;
      }
      this.scrolledNav=false;
    },

    checkScreen(){
      this.windowWidth=window.innerWidth;
      if(this.windowWidth <= 750){
        this.mobile=true;
        return;
      }
      this.mobile=false;
      this.mobileNav=false;
      return;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/*https://www.youtube.com/watch?v=u2AwJAFeaKc*/
body{
    header{
        background: linear-gradient(90deg, #FD992D 0%, #FFBF49 40%);
        z-index: 99;
        width: 100%;
        position: fixed;  /*mettre fixed à la place*/
        transition: .5s ease all;
        color: white;

        nav{
            position: relative;
            display: flex;
            flex-direction:row;
            padding: 12px 0;
            transition: .5s ease all;
            width:90%;
            margin: 0 auto;
            @media(min-width:1140px){
                max-width: 1140px;
            }

            ul,
            .link{
                font-weight: 500;
                color:white;
                list-style: none;
                text-decoration:none;
                font-family: 'Fredoka';
            }

            li{
                text-transform: uppercase;
                padding: 16px;
                margin-left:16px;
            }

            .link{
                font-size: 20px;
                transition: .3s ease all;
                padding-bottom: 4px;
                border-bottom: 1px solid transparent;

                &:hover{
                    color:rgb(22, 22, 22);
                    border-color:black;
                }
            }
            .branding{
                display: flex;
                align-items: center;
                font-size: 40px;
                .title{
                    text-decoration:none;
                    font-family: 'Fredoka';
                    color:white;
                }
            }

            .navigation{
                display: flex;
                align-items:center;
                flex:1;
                justify-content: flex-end;
            }

            .icon{
                display:flex;
                position:absolute;
                align-items: center;
                top:0;
                right:24px;
                height:100%;

                img{
                    width:30px;
                    transition: .5s ease all;
                }

                .i{
                    cursor:pointer;
                    font-size:24px;
                    transition: .4s ease all; 
                }
            }
            
            .icon-active{
                transform: rotate(180deg);
            }

            .dropdown-nav{
                display: flex;
                flex-direction: column;
                position:fixed;
                width:100%;
                max-width: 250px;
                height: 100%;
                background-color: white;
                top:0;
                left: 0;

                li{
                    margin-left: 0;
                    .link{
                    color:#FD992D;
                    }
                }
            }

            .mobile-nav-enter-active,
            .mobile-nav-leave-active{
            transition: 0.6s ease all;
            }
            .mobile-nav-enter-from,
            .mobile-nav-leave-to{
            transform: translateX(-250px);
            }

            .mobile-nav-enter-to{
            transform: translateX(0);
            }
            }
        }

        .scrolled-nav{
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);

        nav{
            padding: 8px 0;
        }
    }
}
</style>
