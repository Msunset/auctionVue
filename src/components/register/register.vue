<template>
  <div class="login-warp">
    <el-form label-width="80px"
             :model="formData"
             class="login-form"
             :rules="rules" ref="formData">
      <h2 style="text-align: center;color: rgba(83,104,113,0.52)">用户注册</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item label="用户性别" prop="sex">
        <el-select v-model="formData.sex" placeholder="请选择" value="">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户生日" prop="birthday">
        <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="formData.birthday"
                          style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-button type="primary" style="margin-left: 400px" @click="addUser()"> 提交注册</el-button>


    </el-form>
  </div>

</template>

<script>
    import {formatDate} from "../../plugin/dateFormat";

    export default {
        data() {
            return {
                formData: {
                    username: '',
                    password: '',
                    sex: '',
                    birthday: ''
                },
                options: [{
                    value: '1',
                    label: '男'
                }, {
                    value: '2',
                    label: '女'
                }],
                value: '',
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    birthday: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            addUser() {
                this.$refs.formData.validate((valid) => {
                    if (valid) {
                        this.axios.post(`user/addUser`, this.formData).then(res => {
                            const {flag, msg} = res.data;
                            if (flag) {
                                //成功
                                this.$message({
                                    type: 'success',
                                    message: msg
                                });
                                this.$router.push('/')
                            } else {
                                this.$message.error(msg);
                            }
                        })
                    } else {
                        return false;
                    }
                });



            }
        }
    }
</script>

<style scoped>
  .login-warp {
    height: 200%;
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
