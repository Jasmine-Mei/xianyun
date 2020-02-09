<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"> </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password">
      </el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="LoginSubmit">
      登录
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 校验的函数
    // rule 用不上，代表校验的规则
    // value 代表输入框的值
    // callback回调函数，该函数必须要执行，如果传了错误的对象就会在页面显示错误
    // 如果验证通过不用传参数
    const validateUsername = (rule, value, callback) => {
      // 通过value校验到底是否是手机号码, true的话表示通过，false就不通过
      const isValid = /^1[3-9][0-9]{9}$/.test(value);
      // 不是手机号码报错
      if (!isValid) {
        callback(new Error("手机号码格式错误"));
      } else {
        // 通过
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "13800138000",
        password: "123456"
      },
      // 表单规则
      rules: {
        // validator 是自定义的校验函数
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur,change"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur,change"
          }
        ]
      }
    };
  },
  methods: {
    // 提交登录
    LoginSubmit() {
      // console.log(this.form);

      // 验证表单
      this.$refs["form"].validate(valid => {
        // 为true表示没有错误
        if (valid) {
          this.$store.dispatch("user/login", this.form).then(res => {
            // 成功提示
            this.$message({
              message: "登陆成功，正在跳转",
              type: "success"
            });
            // 跳转到首页
            setTimeout(() => {
              this.$router.replace("/");
            }, 1000);
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
