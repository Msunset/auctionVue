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
      <el-form-item label="图片" >
        <el-input v-model="formData.image"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" >
        <el-input v-model="formData.price"></el-input>
      </el-form-item>

      <el-form-item label="开始时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>

      <el-button type="primary" style="margin-left: 400px" @click="addUser()"> 提交添加</el-button>

    </el-form>
  </div>
</template>
<script>
    export default {
        name: "addProduct"
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
