<template>
	<div>
		<div class="reg-div box">

			<div style="padding-top: 60px; padding-bottom: 40px;">
				<h1 class="title" style="color:black;font-size: 48px">欢迎使用番茄TODO</h1>
				<h2 class="subtitle" style="color:black;font-size: 26px; padding-top: 20px">注册</h2>
			</div>

			<label class="label label-text">用户名</label>
			<p class="control has-icon has-icon-right">
				<input class="input is-info" type="text" placeholder="用户名在3-10个字符" v-model="regInfoVo.username"
				       v-bind:class="{'is-danger': unPassFlag.username, 'is-success': !unPassFlag.username && !initFlag.username}"
				       @change="checkUsername($event)" @keyup="checkUsername($event)">
				<i class="fa fa-warning" v-if="unPassFlag.username"></i>
				<i class="fa fa-check" v-if="!unPassFlag.username && !initFlag.username"></i>
				<span class="help help-text" v-text="unPassText.username"
				      v-bind:class="{'is-danger': unPassFlag.username, 'is-success': !unPassFlag.username}"></span>
			</p>


			<label class="label label-text">邮箱</label>
			<p class="control has-icon has-icon-right" v-bind:class="{'is-loading': checkingEmailFlag}">
				<input class="input is-info" type="text" placeholder="xxx@xx.com" v-model="regInfoVo.email"
				       v-bind:class="{'is-danger': unPassFlag.email, 'is-success': !unPassFlag.email && !initFlag.email}"
				       @change="checkEmail($event)" @keyup="checkEmail($event)">
				<i class="fa fa-warning" v-if="unPassFlag.email"></i>
				<i class="fa fa-check" v-if="!unPassFlag.email && !initFlag.email"></i>
				<span class="help help-text" v-text="unPassText.email"
				      v-bind:class="{'is-danger': unPassFlag.email, 'is-success': !unPassFlag.email}"></span>
			</p>


			<label class="label label-text">密码&emsp;<a class="showPwdA" v-if="showPwdFlag" href="javascript:void(0)"
			                                     @click="showPwd">显示密码</a></label>
			<p class="control has-icon has-icon-right">
				<input class="input is-info" type="password" placeholder="键入密码" v-model="regInfoVo.password" value="bulma"
				       v-bind:class="{'is-danger':unPassFlag.password, 'is-success': !unPassFlag.password && !initFlag.password}"
				       @change="checkPwd($event)" @keyup="checkPwd($event)">
				<i class="fa fa-warning" v-if="unPassFlag.password"></i>
				<i class="fa fa-check" v-if="!unPassFlag.password && !initFlag.password"></i>
				<span class="help help-text" v-text="unPassText.password"
				      v-bind:class="{'is-danger': unPassFlag.password, 'is-success': !unPassFlag.password}"></span>
			</p>


			<label class="label label-text"
			       v-if="!unPassFlag.email && !unPassFlag.password && !initFlag.email && !initFlag.password && !unPassFlag.username && !initFlag.username">邮箱验证码
			</label>
			<a class="disableAFlag send-email-a"
			   href="javascript:void(0)"
			   @click="sendRegMail"
			   v-if="!unPassFlag.email && !unPassFlag.password && !initFlag.email && !initFlag.password && !unPassFlag.username && !initFlag.username"
			   style="color: deepskyblue">发送验证码</a>
			<p class="control"
			   v-if="!unPassFlag.email && !unPassFlag.password && !initFlag.email && !initFlag.password && !unPassFlag.username && !initFlag.username ">
				<input class="input is-info" type="text" placeholder="请输入8位验证码" v-model="regInfoVo.activeCode">
				<span class="help help-text is-danger" v-text="unPassText.activeCode"></span>
			</p>
			<p class="control is-center" style="text-align: center; margin-top: 30px;">
				<button class="button is-success reg-btn is-center" v-bind:class="{'is-loading': btnLoading}" @click="registerMe">为我注册</button>
				<br>
				<br>
				<button class="button is-info login-btn is-center" @click="goLogin">已有账号？点我登录</button>
				<!--<button class="button is-link">Cancel</button>-->
			</p>
		</div>
	</div>
</template>

<script>
    import $ from 'jquery'

    export default {
        name: "Reg",
        data() {
            return {
                MY_BASE_URL: 'http://127.0.0.1:8080/api',
                regInfoVo: {
                    username: '',
                    email: '',
                    password: '',
                    activeCode: '',
                },
		            // 按钮正在加载中
                btnLoading: false,

                // a 标签是否在禁用，即在60s倒计时中
                disableAFlag: false,
                // 是否正在校验邮箱
                checkingEmailFlag: false,
                // 显示显示密码链接
                showPwdFlag: false,
                unPassFlag: {
                    username: false,
                    email: false,
                    password: false,
                    activeCode: true,
                },
                initFlag: {
                    username: true,
                    email: true,
                    password: true,
                },
                unPassText: {
                    username: '',
                    email: '',
                    password: '',
                    activeCode: '',
                },
            }
        },
        // mounted: {},
        // watch: {
        //     regInfoVo: function (val) {
        //         console.log(val);
        //     }
        // },
        methods: {
            checkUsername: function () {
                this.initFlag.username = false;
                let inputUsername = this.regInfoVo.username;
                if (inputUsername === null || inputUsername === '') {
                    this.unPassText.username = '用户名不能为空';
                    this.unPassFlag.username = true;
                    return false;
                }
                if (inputUsername.length < 3 || inputUsername.length > 10) {
                    this.unPassText.username = '用户名长度在3-10个字符';
                    this.unPassFlag.username = true;
                    return false;
                }
                this.unPassFlag.username = false;
                this.unPassText.username = '用户名可用';
                return true;
            },

            showPwd: function () {
                $(".showPwdA").html(this.regInfoVo.password);
                setTimeout(function () {
                    $(".showPwdA").html("显示密码");
                }, 3000);
            },
            checkEmail: function () {
                this.checkingEmailFlag = true;
                this.initFlag.email = false;
                // 校验邮箱正则
                let inputEmail = this.regInfoVo.email;
                if (inputEmail === null || inputEmail === '') {
                    this.unPassText.email = '邮箱不能为空';
                    this.unPassFlag.email = true;
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
                this.checkingEmailFlag = true;
                let reged = this.checkEmailReg();
                if (reged) {
                    this.unPassText.email = '邮箱已经被注册过了';
                    this.unPassFlag.email = true;
                    this.checkingEmailFlag = false;
                    return false;
                }
                this.unPassFlag.email = false;
                this.unPassText.email = '邮箱可用';
                this.checkingEmailFlag = false;
                return true;
            },
            checkPwd: function () {
                this.initFlag.password = false;
                let pwd = this.regInfoVo.password;
                if (pwd === null || pwd === '') {
                    this.showPwdFlag = false;
                    this.unPassText.password = '密码不能为空';
                    this.unPassFlag.password = true;
                    return false;
                }
                this.showPwdFlag = true;
                if (pwd.length > 16 || pwd.length < 6) {
                    this.unPassText.password = '密码长度在6-16位';
                    this.unPassFlag.password = true;
                    return false;
                }
                let reg = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){5,15}$/;
                if (!reg.test(pwd)) {
                    this.unPassText.password = '密码需要以字母开头，字符只可包含 \'_\' , \'.\'';
                    this.unPassFlag.password = true;
                    return false;
                }
                this.unPassFlag.password = false;
                this.unPassText.password = '密码校验通过';
                return true;
            },

            sendRegMail: function () {
                let that = this;
                if (this.disableAFlag) {
                    alert("请稍候重试");
                    return;
                }
                if (!that.checkUsername()) {
                    return;
                }
                if (!that.checkEmail()) {
                    return;
                }
                if (!that.checkPwd()) {
                    return;
                }
                let $a = $(".send-email-a");
                that.disableAFlag = true;
                $a.attr("disabled", true).css("pointer-events", "none").css("color", "grey");
                let i = 60;
                that.sendMail();
                let it = setInterval(function () {
                    $a.text("验证码已发送到您的邮箱，" + i + " 秒后可以再次发送");
                    i--;
                    if (i === 0) {
                        clearInterval(it);
                        $a.text("发送验证码");
                        $a.attr("disabled", false).css("pointer-events", "auto").css("color", "deepskyblue");
                        that.disableAFlag = false;
                    }
                }, 1000);
            },
            checkEmailReg: function () {
                let that = this;
                let passFlag = false;
                that.checkingEmailFlag = true;
                $.get({
                    url: that.MY_BASE_URL + '/user/checkMailExist?email=' + that.regInfoVo.email,
                    dataType: 'json',
                    async: false,
                    success: function (resp) {
                        if (resp.message === '1') {
                            passFlag = true;
                        }
                    }
                });
                that.checkingEmailFlag = false;
                return passFlag;
            },
            sendMail: function () {
                let that = this;
                that.$axios({
                    url: '/user/sendMail?email=' + that.regInfoVo.email + '&username=' + that.regInfoVo.username,
                    changeOrigin: true,
                    dataType: 'json',
                    method: 'get',
                }).then(successResponse => {
                    console.log(successResponse);
                }).catch((err) => {
                    console.log(err.response);
                });
            },
            checkEmailActiveCode() {
                let that = this;
                let passFlag = false;
                $.get({
                    url: that.MY_BASE_URL + '/user/checkActiveCode?email=' + that.regInfoVo.email + '&activeCode=' + that.regInfoVo.activeCode,
                    dataType: 'json',
                    // changeOrigin: true,
                    // method: 'get',
                    async: false,
                    success: function (resp) {
                        if (resp.message === '1') {
                            passFlag = true;
                        } else {
                            that.unPassText.activeCode = '激活码不正确';
                        }
                    }
                });
                return passFlag;
            },
            registerMe: function () {
                // return;
                this.showBtnProgress(true);
                let that = this;
                if (!that.checkUsername()) {
                    this.showBtnProgress(false);
                    return;
                }
                if (!that.checkEmail()) {
                    this.showBtnProgress(false);
                    return;
                }
                if (!that.checkPwd()) {
                    this.showBtnProgress(false);
                    return;
                }
                let checkEmailActiveCode = this.checkEmailActiveCode();
                if (!checkEmailActiveCode) {
                    this.showBtnProgress(false);
                    return;
                }

                let rec = {
                    nickname: that.regInfoVo.username,
                    pwd: that.regInfoVo.password,
                    email: that.regInfoVo.email,
                };
                that.$axios({
                    url: '/user/register',
                    data: rec,
                    dataType: 'json',
                    contentType: 'application/json',
                    changeOrigin: true,
                    method: 'post',
                }).then(successResponse => {
                    that.showBtnProgress(false);
                    let resp = successResponse.data;
                    console.log(resp);
                    if (resp.message === "1") {
                        // alert("注册成功");
		                    // 重定向到登录页面
		                    let dataObj = resp.data0;
                        this.$router.push({
                            path :'/',
                            name: 'main',
                            params: {
                                dataObj: dataObj,
                            }
                        });
                    } else {
                        alert("注册失败");
                    }
                    that.showBtnProgress(false);
                }).catch((err) => {
                    console.log(err.response);
                });
            },
            showBtnProgress: function (on) {
                this.btnLoading = on;
            },
            goLogin: function () {
                this.$router.push({
		                name: 'login'
                });
            }
        }
    }
</script>

<style scoped>
	.reg-div {
		/*margin-top: 150px;*/
		padding-bottom: 49px;
		width: 40%;
		margin-left: auto;
		margin-right: auto;
	}

</style>