<template>
  <div class="login-warp">
    <div>
      <h2 style="text-align: center;color: #6a7165">竞拍详情</h2>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="id"
          width="100">
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
      </el-table>
      <h4 style="color: #6a7165">选择竞价金额</h4>

      <el-button  type="primary" style="margin: 30px" plain @click="choseMoney(50)">50元</el-button>
      <el-button  type="primary" style="margin: 30px" plain @click="choseMoney(100)">100元</el-button>
      <el-button type="info" style="margin: 30px" plain @click="choseMoney(150)" >150元</el-button>
      <el-button type="info" style="margin: 30px" plain @click="choseMoney(200)">200元</el-button>
      <el-button type="warning" style="margin: 30px" plain @click="choseMoney(250)">250元</el-button>
      <el-button type="warning" style="margin: 30px" plain @click="choseMoney(300)">300元</el-button>
      <el-button type="danger" style="margin: 30px" plain @click="choseMoney(350)">350元</el-button>
      <el-button type="danger" style="margin: 30px" plain @click="choseMoney(400)">400元</el-button>
      <div >
      <el-button type="primary"
                 style="margin-left: 1020px;margin-top: 10px;width: 100px;height: 50px"
                 @click="addMoney()" >确认</el-button>
      </div>
      <h4 style="color: #6a7165">竞价纪录</h4>

      <div>
        <template >
          <el-table
            height="350"
            :data="tableData2"
            style="width: 100%"
            :default-sort = "{prop: 'id', order: 'descending'}">
            <el-table-column
              sortable
              prop="id"
              label="id"
              width="100">
            </el-table-column>
            <el-table-column
              prop="uid"
              label="用户名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="productname"
              label="产品名称"
              width="150">
            </el-table-column>
            <el-table-column
              width="210"
              label="用户竞价时间">
              <template slot-scope="scope">
                <span>{{scope.row.creattime | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="beforeprice"
              label="之前价格"
              width="150">
            </el-table-column>
            <el-table-column
              prop="addprice"
              label="用户加价"
              width="180">
            </el-table-column>
            <el-table-column
              prop="nowprice"
              label="现在价格"
              width="180">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>


  </div>
</template>

<script>
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
            this.findById();
            this.findByIdRecord();
        },
        data() {
            return {
                tableData: [],
                tableData2: [],
                nowTime: '',
                price:null,


            }

        },
        methods: {
            m1() {
                TimeDown()
            },
            open2(msg,type) {
                this.$message({
                    message: msg,
                    type: type
                });
            },


            findById() {
                let id = this.$route.query.id;
                this.nowTime = new Date().valueOf();
                this.axios.get(`Product/findById/${id}`).then(res => {
                    console.log(res.data);
                    this.tableData = res.data.data;
                })
            },
            choseMoney(price){
                this.price=price
            },
            addMoney(){
                let s = localStorage.getItem('username');
                let produce= this.tableData.shift();
                let price = this.price;
                if (price ==null){
                    this.open2("请正确填写价格",'warning');
                    this.findById();
                    return
                }
                console.log(produce);
                this.axios.post(`record/addRecord/${s}/${price}`,produce).then(res=>{
                    const {flag,msg} = res.data;
                    if(flag){
                        this.open2(msg,'success');
                        this.findById();
                        this.findByIdRecord();
                        this.price = null;
                    }
                })
            },
            findByIdRecord(){
                let pid = this.$route.query.id;
                this.axios.get(`record/findByIdRecord/${pid}`).then(res =>{
                    this.tableData2 = res.data.data;
                })
            }
        }
    }


</script>

<style scoped>
  .login-warp {
    height: 100%;
    display: flex;
    margin-top: 30px;
    justify-content: center;
    align-items: center;

  }


</style>
