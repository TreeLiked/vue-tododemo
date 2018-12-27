<template>

	<div>
		<h1 class="title">这里是主页面</h1>
		<div>
			<label class="label label-text">用户id</label>
			<p v-text="userInfo.id"></p>
			<br>
			<label class="label label-text">用户邮箱</label>
			<p v-text="userInfo.email"></p>
			<br>
			<label class="label label-text">用户昵称</label>
			<p v-text="userInfo.nickname"></p>
			<br>
			<label class="label label-text">用户注册时间</label>
			<p v-text="userInfo.regTime"></p>
			<br>
			<label class="label label-text">用户性别</label>
			<p v-text="userInfo.gender"></p>
			<br>
			<label class="label label-text">用户生日</label>
			<p v-text="userInfo.birth"></p>
			<br>
			<label class="label label-text">用户头像</label>
			<p v-text="userInfo.avatar"></p>
			<br>
			<label class="label label-text">用户个性签名</label>
			<p v-text="userInfo.slogan"></p>
			<br>
			<label class="label label-text">用户账户状态</label>
			<p v-text="userInfo.state"></p>
			<!--<p v-text="userInfo.id"></p>-->
		</div>
		<p class="control is-center" style="text-align: center; margin-top: 30px;">

			<button class="button is-info is-center" @click="logout">登出</button>
			<!--<button class="button is-link">Cancel</button>-->
		</p>
	</div>

</template>

<script>
    import Cookies from 'js-cookie';

    export default {
        name: "Main",
        data() {
            return {
                userInfo: '',
                USER_INFO_KEY: 'USER_INFO_COOKIE'

            }
        },
        mounted() {
            let dataObj = this.$route.params.dataObj;
            // console.log(this.$router.params);
            let illegalAccess = true;
            if (dataObj === undefined || dataObj === null) {
                let userinfocookie = Cookies.get(this.USER_INFO_KEY);
                if (userinfocookie === undefined || userinfocookie === null || userinfocookie === '') {
                    console.log('无cookie');
                } else {
                    illegalAccess = false;
                    this.getUserInfo(userinfocookie);
                }
            } else {
                illegalAccess = false;
                this.userInfo = dataObj;
            }
            if (illegalAccess) {
                this.redirectLogin();
            }
        },
        methods: {
            getUserInfo: function (userId) {
                let that = this;
                that.$axios({
                    url: '/user/rem?userId=' + userId,
                    dataType: 'json',
                    changeOrigin: true,
                    method: 'get',
                }).then(successResponse => {
                    let resp = successResponse.data;
                    if (resp.message === "1") {
                        that.userInfo = resp.data0;
                    } else {
                        this.redirectLogin();
                    }
                }).catch((err) => {
                    throw err;
                });

            },
            logout: function () {
                Cookies.remove(this.USER_INFO_KEY);
                this.redirectLogin();
            },
            redirectLogin() {
                this.$router.push({
                    name: 'login',
                });
            }
        },
        // after (to, from, next) {
        //     let id = from.params.id;
        //     console.log(id);
        //
        //     // alert(id);
        //     // getPost(to.params.id, (err, post) => {
        //     //     next(vm => vm.setData(err, post))
        //     // })
        // },

    }
</script>

<style scoped>

</style>