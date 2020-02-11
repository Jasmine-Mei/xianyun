// 用户管理
export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {
        token: "",
        user: {}
    }
})

// 给state的数据赋值的方法，mutations第一个参数必须是state
export const mutations = {
    // 保存用户信息到state
    setUserInfo(state, data) {
        state.userInfo = data;
    },

    // 清除用户数据
    clearUserInfo(state, info) {
        if (process.browser) {
            localStorage.removeItem("userInfo");
        }
        state.userInfo = {};
    }
}

export const actions = {
    // 登录
    login({ commit }, data) {
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: data
        }).then(res => {
            const data = res.data;
            // 保存到state
            commit('setUserInfo', data);
            return data;
        })
    },
    register(stire, data) {
        return this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: data
        }).then(res => {
            const data = res.data;
            // 保存到state
            commit('setUserInfo', data);
            return data;
        })
    },
    // 获取验证码
    captcha(state, tel) {
        console.log(tel);

        return this.$axios({
            url: "/captchas",
            method: "POST",
            data: { tel }
        }).then(res => {
            return res
        })
    }
}