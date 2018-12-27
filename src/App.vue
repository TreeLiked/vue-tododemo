<template>
	<div id="app">
		<!--<img alt="Vue logo" src="./assets/logo.png">-->

		<div class="binding-bg"></div>
		<!--<Nav></Nav>-->
		<transition
						:name="transitionName"
						enter-active-class="bounceLeft-enter"
						leave-active-class="bounceRight-leave">
			<router-view class="curr-view"></router-view>
		</transition>
	</div>
</template>


<script>

    // import HelloWorld
    // from './components/HelloWorld.vue'
    // import Reg from './components/Reg.vue'
    // import Log from './components/Log.vue'
    import Nav from './components/Nav'

    export default {
        name: 'app',
        components: {
            Nav
        },
        data() {
            return {
                transitionName: 'slideInUp',
            }
        },
        watch: {
            '$route'(to, from) {
                console.log(to.path + '------------');
                // const toDepth = to.path.split('/').length;
                // const fromDepth = from.path.split('/').length;
                // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
                this.transitionName = 'slideInUp';
            }
        }
    }
</script>


<!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css"/>-->
<!--<link rel="stylesheet" href="https://unpkg.com/vue2-animate/dist/vue2-animate.min.css"/>-->

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		/*background-color: #F5F5F5;*/
		width: 100%;
		/*height: 100%;*/
		height: 100vm;
		/*background-size: 100%;*/
		/*color: #2c3e50;*/
		/*margin-top: 60px;*/
	}

	.binding-bg {

		background: url("https://pic-res-1253931949.cos.ap-shanghai.myqcloud.com/img/2018-12-27-nasa-43563-unsplash.jpg?q-sign-algorithm=sha1&q-ak=AKIDFKRetDGBkLzXu4iVt67zoTwpjw8OcQ9g&q-sign-time=1545916410;1545917310&q-key-time=1545916410;1545917310&q-header-list=&q-url-param-list=&q-signature=77a807c2a332bbdc3359cf8f0d91e14c465a5b68") no-repeat center center;
		background-size: 100%;
		width: 100%;
		height: 100%;
		/*height: 100vm;*/
		position: absolute;
		z-index: -10;
		/*opacity: 0.4;*/
		/*background: rgba(0, 0, 0, 0.5);*/
	}

	.curr-view {
		padding-top: 150px;
		margin-left: auto;
		margin-right: auto;
		text-align: center;
		/*transition: all 3.5s;*/
		/*animation: ease-in-out;*/
	}
</style>
