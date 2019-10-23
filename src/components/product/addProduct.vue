<template>
  <div class="login-warp">
    <el-form label-width="80px"
             :model="formData"
             class="login-form"
             :rules="rules" ref="formData">
      <h2 style="text-align: center;color: rgba(83,104,113,0.52)">添加商品</h2>
      <el-form-item label="商品名称" prop="productname">
        <el-input v-model="formData.productname"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-input v-model="formData.image"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="formData.price"></el-input>
      </el-form-item>

      <el-form-item label="开始时间" prop="starttime">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="formData.starttime"
                          style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="结束时间" prop="endtime">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="formData.endtime"
                          style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>

      <el-button type="primary" style="margin-left: 400px" @click="addProduct()"> 提交添加</el-button>

    </el-form>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                formData: {
                    productname: '',
                    image: '',
                    price: '',
                    starttime: '',
                    endtime: ''
                },
                rules: {
                    productname: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
                    ],
                    price: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur'}
                    ],
                    starttime: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    endtime: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ]
                }
            }

        },
        methods: {
            addProduct() {
                this.$refs.formData.validate((valid) => {
                    if (valid) {
                        this.axios.post(`Product/addProduct`,this.formData).then(res =>{
                            const {flag,msg}=res.data
                            if(flag){
                                //添加成功
                                this.$message.success(msg);
                                this.$router.push('/index')
                            }
                        });
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
