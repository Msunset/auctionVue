<template class="big">
  <div class="login-warp">
    <el-form class="login-form"
             label-width="70px"
             :model="formData"
             :rules="rules" ref="formData">
      <h2 style="text-align: center;color: rgba(83,104,113,0.52)">用户登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button type="primary" style="width: 400px;margin-left: 70px" class="login-btn" @click.passive="login(formData )"
                 id="btn">登录
      </el-button>
      <el-button type="primary" style="margin-top:20px;margin-left: 70px;width: 400px" class="login-btn"
                 @click.passive="register()" id="btn2">注册
      </el-button>
    </el-form>
  </div>
</template>

<script>
    export default {
        created() {
        },
        data() {
            return {
                formData: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                }

            }
        },
        methods: {
            open2(msg, type) {
                this.$message({
                    message: msg,
                    type: type
                });
            },
            login() {
                this.$refs.formData.validate((valid) => {
                    if (valid) {
                        this.axios.post('/user/login', this.formData).then(res => {
                            const {data, flag, msg} = res.data;
                            if (flag) {
                                localStorage.setItem('username', data.username);
                                localStorage.setItem("loginId", data.id);
                                this.open2(msg, 'success');
                                this.$router.push("/index")
                            } else {
                                this.open2(msg, 'warning');
                            }
                        })
                    } else {
                        return false;
                    }
                });

            },
            register() {
                this.$router.push('/register')
            }
        }
    }

</script>

<style scoped>
  .login-warp {
    height: 100%;
    display: flex;
    margin-top: 200px;
    justify-content: center;
    align-items: center;

  }

  .login-warp .login-form {
    width: 500px;
    background: #ebeeff;
    border-radius: 10px;
    padding: 30px;
  }

  .login-warp .login-btn {
    background-color: #45beff;
    width: 100%;
  }


</style>
