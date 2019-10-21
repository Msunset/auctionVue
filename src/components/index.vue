<template>
  <div class="login-warp">
    <div>
      <h2 style="text-align: center;color: #6a7165">商品竞拍列表</h2>

      <el-form  label-width="80px">
        <el-input placeholder="请输入商品名称" style="width: 250px;margin-left: 10px" v-model="formData">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button
                   size="mini"
                   style="height: 38px;margin-left: 33px;margin-bottom: 10px" @click="findByUserName(formData)">搜索
        </el-button>
        <el-button type="info"
                   size="mini"
                   style="height: 38px;margin-left: 20px;margin-bottom: 10px" @click="skipProduct()">添加
        </el-button>
      </el-form>

<!--      竞拍表格-->
      <el-table
        height="300px"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="id"
          width="50">
        </el-table-column>
        <el-table-column
          prop="productname"
          label="商品名称"
          width="200">
        </el-table-column>

        <el-table-column
          prop="price"
          label="价格"
          width="100">
        </el-table-column>
        <el-table-column
          label="商品状态"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.endtime>nowTime?'正在拍卖':'拍卖结束'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="上架时间"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.creattime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="开始时间"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.starttime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="结束时间"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.endtime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button v-if="scope.row.endtime>nowTime"
                       size="mini"
                       type="success"
                       @click="findByIdProduct(scope.row.id)">竞拍
            </el-button>
            <el-button v-if="scope.row.endtime<nowTime"
                       type="danger" disabled
                       size="mini">竞拍结束
            </el-button>
          </template>

        </el-table-column>
      </el-table>
      <h2 style="text-align: center;color: #6a7165">好友列表</h2>
<!--      查询好友输入框-->
      <el-form  label-width="80px">
      <el-input placeholder="请输入好友昵称" style="width: 250px;margin-left: 10px" v-model="formData">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
        <el-button
                   size="mini"
        style="height: 38px;margin-left: 33px;margin-bottom: 10px" @click="findByUserName(formData)">添加/搜索
        </el-button>

      </el-form>
<!--      好友表格-->
      <el-table
        height="300px"
        :data="tableData2"
        style="width: 100%">
        <el-table-column
          width="50"
          label="#">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="好友昵称"
          width="200">
          <template slot-scope="scope" >
            <span v-if="state===1">{{scope.row.personNameb}}</span>
            <span v-if="state===0">{{scope.row.username}}</span>
          </template>

        </el-table-column>
        <el-table-column
          width="100"
          label="性别">
          <template slot-scope="scope">
            <span>{{scope.row.sex===1?'男':'女'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="与好友添加日期"
          width="200">
          <template slot-scope="scope">
            <span>{{scope.row.creattime | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="好友生日">
          <template slot-scope="scope">
            <span>{{scope.row.birthday | formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="好友操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       v-if="state===1"
                       type="danger" round
                       @click="deleteById(scope.row.persona,scope.row.personb)">删除好友
            </el-button>
            <el-button size="mini"
                       v-if="state===1"
                       type="success" round
                       @click="chat()">与好友沟通
            </el-button>
            <el-button size="mini"
                       v-if="state===0"
                        round
                       @click="addFriend(scope.row.id)">添加好友
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>

</template>

<script>
    import {formatDate} from '../plugin/dateFormat'

    export default {
        filters: {
            formatDate: function (date) {
                var d = new Date(date);
                var year = d.getFullYear();
                var month = d.getMonth() + 1;
                var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                var hour = d.getHours();
                var minutes = d.getMinutes();
                var seconds = d.getSeconds();
                return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
            }
        },
        created() {
            this.findAllProduct();

            this.findByUserFriend();
        },
        data() {
            return {
                tableData: [],
                tableData2: [],
                nowTime: '',
                id:'',
                formData:'',
                state:1//用来标识单查询0和多查询1
            }
        },
        methods: {
            //获取所有商品
            findAllProduct() {
                this.axios.get('Product/findAll').then(res => {
                    this.tableData = res.data.data;
                    this.nowTime = new Date().valueOf();
                })

            },
            //查询单个商品
            findByIdProduct(id) {
                this.$router.push({path:'/product',query:{id:id}});

            },
            //查询好友列表
            findByUserFriend(){
                this.state=1;
                this.formData='';
                let loinId = localStorage.getItem("loginId");
                this.axios.get(`relation/findByUserFriend/${loinId}`).then(res =>{
                    this.tableData2 = res.data.data;
                    console.log(this.tableData2)
                })
            },
            //删除好友
            deleteById(idA,idB) {
                this.$confirm('好友将要删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        this.axios.delete(`relation/deleteById/${idA}/${idB}`).then(res =>{
                            const {flag,msg} = res.data;
                            if (flag){
                            this.$message({
                                type: 'success',
                                message: msg
                            });
                                this.findByUserFriend();
                            }else {
                                this.$message.error('操作失败！');
                            }
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            //查询好友单
            findByUserName(username){
                this.state=0;
                let loginUsername = localStorage.getItem("username");
                if(username===loginUsername){
                    alert("请不要查询自己");
                  this.findByUserFriend();
                    return false;

                }
                if (username.length===0){
                    this.findByUserFriend();
                }else {
                this.axios.get(`user/findByUserName/${username}`).then(res =>{
                    this.tableData2 =res.data.data;
                    this.$message({
                        type: 'success',
                        message: '查询成功'
                    });
                    console.log(res.data.data)
                })
                }
            },
            //添加好友
            addFriend(idB){
                let loginId = localStorage.getItem('loginId');
                this.axios.get(`relation/addFriend/${loginId}/${idB}`).then(res =>{
                    const {flag,msg} = res.data;
                    if (flag){
                        this.$message({
                            type: 'success',
                            message: msg
                        });
                        this.findByUserFriend();
                    }else {
                        this.$message.error(msg);
                    }
                })

            },
          //商品添加
          skipProduct(){
            let state = localStorage.getItem('state');
            if (state == 1){
              this.$message.error("您不是管理员无权操作")

            }else (
              this.$router.push('addProduct')

            )
          },
            //聊天
            chat(){
                this.$router.push("/chat")
            }
        }

    }
</script>

<style scoped>
  .login-warp {
    height: 100%;
    display: flex;
    margin-top: 50px;
    justify-content: center;
    align-items: center;
  }

</style>
