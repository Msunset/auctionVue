<template>
  <div class="login-warp">
    <div>
      <h2 style="text-align: center;color: #6a7165">商品竞拍列表</h2>

      <el-form label-width="80px">
        <el-input placeholder="请输入商品名称" style="width: 250px;margin-left: 10px" v-model="inputData">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button
          size="mini"
          style="height: 38px;margin-left: 33px;margin-bottom: 10px" @click="searchByProductName(inputData)">搜索
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
        style="width: 100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(225, 225, 225, 0.2)">
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
                       round
                       type="success"
                       @click="findByIdProduct(scope.row.id)">竞拍
            </el-button>
            <el-button v-if="scope.row.endtime<nowTime"
                       round
                       type="danger" disabled
                       size="mini">竞拍结束
            </el-button>
          </template>

        </el-table-column>
      </el-table>
      <h2 style="text-align: center;color: #6a7165">好友列表</h2>
      <!--      查询好友输入框-->
      <el-form label-width="80px">
        <el-input placeholder="请输入好友昵称" style="width: 250px;margin-left: 10px" v-model="formData">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button
          size="mini"
          style="height: 38px;margin-left: 33px;margin-bottom: 10px" @click="findByUserName(formData)">添加/搜索
        </el-button>
        <el-button
          size="mini"
          type="info" plain
          style="height: 38px;margin-left: 33px;margin-bottom: 10px" @click="dialogFormVisible=true">发布动态
        </el-button>
        <el-button
          size="mini"
          type="primary" plain
          style="height: 38px;margin-left: 688px;margin-bottom: 10px" @click="drawer = true">我的动态
        </el-button>
      </el-form>

      <!--      好友表格-->
      <el-table
        height="300px"
        :data="tableData2"
        style="width: 100%"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(225, 225, 225, 0.2)">
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
          <template slot-scope="scope">
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


            <el-button size="small"
                       v-if="state===1"
                       type="info" round
                       @click="chat()">与好友沟通
            </el-button>
            <el-button size="small "
                       v-if="state===1"
                       round
                       @click="drawer = true">查看好友动态
            </el-button>
            <el-button size="small "
                       v-if="state===0"
                       round
                       @click="addFriend(scope.row.id)">添加好友
            </el-button>
            <el-button size="mini "
                       v-if="state===1"
                       type="danger" round
                       @click="deleteById(scope.row.persona,scope.row.personb)">删除好友
            </el-button>
          </template>

        </el-table-column>
      </el-table>

      <el-dialog title="发布动态" :visible.sync="dialogFormVisible">
        <el-form :model="formDynamic">
          <el-form-item >
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 20}"
              placeholder="这一刻的想法..."
              v-model="textarea2">
            </el-input>
            <!--  图片上传-->
            <el-upload
              style="margin-top: 30px"
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
<!--      好友动态弹层-->
      <el-drawer
        title="好友动态查询"
        :visible.sync="drawer"
        direction="ltr"
        size="22%"
        :before-close="handleClose">
        <!--      头像-->
        <div class="demo-image" style="margin-left: 30px">
          <div class="block">
            <el-image
              style="width: 40px; height: 40px;border-radius: 100%;margin-top: 20px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
            </el-image>
            <span style="margin-left: 10px;font-size: 25px">会飞的鱼</span>
            <span style="margin-left: 10px">2017/10/23</span>
          </div>
          <!--          主题内容-->
          <div style="margin-top: 10px">
            <span>主题内容家分公司答复估计是的法规</span>
          </div>
          <div style="margin-top: 20px">
            <el-image
              style="width: 80px; height: 80px;margin:10px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
            </el-image>
            <el-image
              style="width: 80px; height: 80px;margin:10px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
            </el-image>
            <el-image
              style="width: 80px; height: 80px;margin:10px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
            </el-image>
            <el-image
              style="width: 80px; height: 80px;margin:10px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
            </el-image>
            <el-image
              style="width: 80px; height: 80px;margin:10px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
            </el-image>


          </div>
          <div>
            <el-button style="margin-left: 250px" class="el-icon-thumb" size="mini" round>赞</el-button>
          </div>
        </div>
      </el-drawer>
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
                dialogImageUrl: '',
                dialogVisible: false,
                textarea2: '',
                formDynamic:{},
                formLabelWidth: '120px',
                dialogFormVisible: false,
                loading: true,
                drawer: false,
                tableData: [],
                tableData2: [],
                nowTime: '',
                id: '',
                formData: '',
                state: 1,//用来标识单查询0和多查询1
                inputData: ''
            }
        },
        methods: {
            //图片上传
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            //获取所有商品
            findAllProduct() {
                this.axios.get('Product/findAll').then(res => {
                    this.tableData = res.data.data;

                    this.nowTime = new Date().valueOf();
                    this.loading=false;
                })

            },
            //查询单个商品
            findByIdProduct(id) {
                this.$router.push({path: '/product', query: {id: id}});

            },
            //查询好友列表
            findByUserFriend() {
                this.state = 1;
                this.formData = '';
                let loinId = localStorage.getItem("loginId");
                this.axios.get(`relation/findByUserFriend/${loinId}`).then(res => {
                    this.tableData2 = res.data.data;

                })
            },
            //删除好友
            deleteById(idA, idB) {
                this.$confirm('好友将要删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.delete(`relation/deleteById/${idA}/${idB}`).then(res => {
                        const {flag, msg} = res.data;
                        if (flag) {
                            this.$message({
                                type: 'success',
                                message: msg
                            });
                            this.findByUserFriend();
                        } else {
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
            findByUserName(username) {
                this.state = 0;
                let loginUsername = localStorage.getItem("username");
                if (username === loginUsername) {
                    alert("请不要查询自己");
                    this.findByUserFriend();
                    return false;

                }
                if (username.length === 0) {
                    this.findByUserFriend();
                } else {
                    this.axios.get(`user/findByUserName/${username}`).then(res => {
                        this.tableData2 = res.data.data;
                        this.$message({
                            type: 'success',
                            message: '查询成功'
                        });
                    })
                }
            },
            //添加好友
            addFriend(idB) {
                let loginId = localStorage.getItem('loginId');
                this.axios.get(`relation/addFriend/${loginId}/${idB}`).then(res => {
                    const {flag, msg} = res.data;
                    if (flag) {
                        this.$message({
                            type: 'success',
                            message: msg
                        });
                        this.findByUserFriend();
                    } else {
                        this.$message.error(msg);
                    }
                })

            },
            //商品添加
            skipProduct() {
                let state = localStorage.getItem('state');
                if (state == 1) {
                    this.$message.error("您不是管理员无权操作")

                } else (
                    this.$router.push('/addProduct')

                )
            },
            //商品搜索单
            searchByProductName(productName) {
                if (productName.length === 0) {
                    this.findAllProduct();
                } else {
                    this.axios.get(`Product/findByProductName/${productName}`).then(res => {
                        this.tableData = res.data.data;
                        if (res.data.flag) {
                            this.$message.success(res.data.msg);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                }
            },
            //关闭提示框
            handleClose(done) {
                done();
                // this.$confirm('确认关闭？')
                //     .then(_ => {
                //
                //     })
                //     .catch(_ => {
                //     });
            },
            //聊天
            chat() {
                this.$router.push("/chat")
            },
            skipDynamic() {
                alert(1)

            },

        }
    }

</script>

<style scoped>
  .login-warp {
    height: 100%;
    display: flex;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
  }

</style>
