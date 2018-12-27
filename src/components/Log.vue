<template>
	<div>
		<!--<transition name="slide"-->
		<!--enter-active-class="bounceLeft-enter"-->
		<!--leave-active-class="bounceRight-leave">-->
		<div class="login-div box">

			<div style="padding-top: 60px; padding-bottom: 40px;">
				<h1 class="title" style="color:black;font-size: 48px">欢迎使用番茄TODO</h1>
				<h2 class="subtitle" style="color:black;font-size: 26px; padding-top: 20px">登录</h2>
			</div>


			<label class="label label-text">邮箱</label>
			<p class="control has-icon has-icon-right" v-bind:class="{'is-loading': checkingEmailFlag}">
				<input class="input is-info" type="text" placeholder="xxx@xxx.com" v-model="loginInfoVo.email"
				       @change="checkEmail"
				       @keyup="checkEmail"
				       v-bind:class="{'is-danger': unPassFlag.email, 'is-success': !unPassFlag.email && !initFlag.email}">
				<i class="fa fa-warning" v-if="unPassFlag.email && !checkingEmailFlag"></i>
				<i class="fa fa-check" v-if="!unPassFlag.email && !initFlag.email && !checkingEmailFlag"></i>
				<span class="help help-text" v-text="unPassText.email"
				      v-bind:class="{'is-danger': unPassFlag.email, 'is-success': !unPassFlag.email}"></span>
			</p>

			<label class="label label-text">密码</label>
			<p class="control has-icon has-icon-right">
				<input class="input is-info" type="password" placeholder="键入密码" v-model="loginInfoVo.password"
				       v-bind:class="{'is-danger':unPassFlag.password, 'is-success': !unPassFlag.password && !initFlag.password}">
				<i class="fa fa-warning" v-if="unPassFlag.password"></i>
				<i class="fa fa-check" v-if="!unPassFlag.password && !initFlag.password"></i>
				<span class="help help-text" v-text="unPassText.password"
				      v-bind:class="{'is-danger': unPassFlag.password, 'is-success': !unPassFlag.password}"></span>
			</p>

			<br>
			<!--<checkbox v-model="tempLogin">7天内为我登录</checkbox>-->


			<p class="control">
				<label class="checkbox">
					<input class="rembe" type="checkbox">
					7天内为我登录
				</label>
			</p>


			<p class="control is-center" style="text-align: center; margin-top: 30px;">
				<button class="button is-success log-btn is-center" v-bind:class="{'is-loading': btnLoading}"
				        @click="loginMe" v-bind:style="{disabled: unPassFlag.email}">登录
				</button>
				<br>
				<br>
				<button class="button is-info is-center" @click="goReg">没有账号？点我注册</button>
				<!--<button class="button is-link">Cancel</button>-->
			</p>
		</div>
		<!--</transition>-->
	</div>
</template>


<script>
    import $ from 'jquery'

    export default {
        name: "Login",
        data() {
            return {
                MY_BASE_URL: 'http://127.0.0.1:8080/api',
                loginInfoVo: {
                    email: '',
                    password: '',
                },
                // 是否记住我
                tempLogin: false,
                // 是否正在进行登录验证
                btnLoading: false,
                // 是否正在校验邮箱
                checkingEmailFlag: false,
                unPassFlag: {
                    email: false,
                    password: false,
                },
                initFlag: {
                    email: true,
                    password: true
                },
                unPassText: {
                    email: '',
                },
            }
        },
        // mounted: {},
        // watch: {
        //     '$route' (to, from) {
        //         const toDepth = to.path.split('/').length;
        //         const fromDepth = from.path.split('/').length;
        //         this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        //     }
        // },
        methods: {
            // setRemme: function () {
            //     console.log($(".rembe").prop('checked'));
            // },
            checkEmail: function () {
                this.checkingEmailFlag = true;
                this.initFlag.email = false;
                // 校验邮箱正则
                let inputEmail = this.loginInfoVo.email;
                if (inputEmail === null || inputEmail === '') {
                    this.unPassFlag.email = true;
                    this.unPassText.email = '邮箱不能为空';
                    this.checkingEmailFlag = false;
                    return false;
                }
                let reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
                if (!reg.test(inputEmail)) {
                    this.unPassText.email = '邮箱格式不正确';
                    this.unPassFlag.email = true;
                    this.checkingEmailFlag = false;
                    return false;
                }
                // 检查邮箱是否被注册过
                let reged = this.checkEmailReg();

                if (!reged) {
                    this.unPassText.email = '账户不存在';
                    this.unPassFlag.email = true;
                    this.checkingEmailFlag = false;
                    return false;
                }
                this.unPassFlag.email = false;
                this.unPassText.email = '';
                this.checkingEmailFlag = false;
                return true;
            },
            checkEmailReg: function () {
                let that = this;
                let passFlag = false;
                that.checkingEmailFlag = true;
                $.get({
                    url: that.MY_BASE_URL + '/user/checkMailExist?email=' + that.loginInfoVo.email,
                    dataType: 'json',
                    async: false,
                    success: function (resp) {
                        if (resp.message === '1') {
                            passFlag = true;
                        }
                    }
                });
                return passFlag;
            },
            loginMe: function () {
                this.showBtnProgress(true);
                let that = this;
                if (!that.checkEmail()) {
                    this.showBtnProgress(false);
                    return;
                }

                let rec = {
                    email: that.loginInfoVo.email,
                    pwd: that.loginInfoVo.password,
                };
                that.$axios({
                    url: '/user/login?temp=' + $(".rembe").prop('checked'),
                    data: rec,
                    dataType: 'json',
                    contentType: 'application/json',
                    changeOrigin: true,
                    method: 'post',
                }).then(successResponse => {
                    console.log(successResponse);
                    let resp = successResponse.data;
                    console.log(resp);
                    that.showBtnProgress(false);
                    if (resp.message === '1') {
                        let loginUser = resp.data0;
                        console.log(loginUser);
                        that.$router.push({
                            path: '/',
                            name: 'main',
                            params: {
                                dataObj: loginUser,
                            }
                        });

                    } else if (resp.message === '0') {
                        console.log(111222332);
                        that.unPassFlag.password = true;
                        that.unPassText.password = '密码不匹配';
                    } else {
                        alert("服务错误");
                    }
                }).catch((err) => {
                    console.log(err.response);
                    alert("服务异常")
                });
            },
            showBtnProgress: function (on) {
                this.btnLoading = on;
            },
            goReg: function () {
                this.$router.push({
                    name: 'reg'
                });
            }
        }
    }
</script>

<style scoped>
	.login-div {
		/*top: 50%;*/
		/*margin-top: 150px;*/
		width: 40%;
		/*position: relative;*/
		/*height: 300px;*/
		/*-ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=18);*/
		/*filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=18);/*/
		/*background: rgba(255 255 255 0.5);*/
		margin-left: auto;
		margin-right: auto;
		padding-bottom: 49px;
	}

</style>