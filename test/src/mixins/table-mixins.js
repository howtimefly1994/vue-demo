export default {
    data() {
        return {

        }
    },
    methods: {
        // 时间戳转换成时间
        // 使用element table组件中的formatter属性，传入一个函数
        formatDate(row, column) {
            // let date = new Date(parseInt(row.date) * 1000); 13位时间戳需*1000
            let date = new Date(parseInt(row.creatTime) * 1000);//十位时间戳不需要*1000
            let Y = date.getFullYear() + '-';
            let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
            let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
            let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
            let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        },
        formatGender(row) {
            var gender = ''
            if (row.sex == '1') {
                gender = '男'

            } else {
                gender = '女'
            }
            return gender
        },
        //判断打开哪个弹窗
        showDialog(component, type, row) {
            // this.dialogFormVisible = true;
            //  this.dialogComponent = "info";
            if (type == "Info") {
                this.dialogType = "编辑";
            } else if (type == "detail") {
                this.dialogType = "详情";
            } else if (type == "add") {
                this.dialogType = "新增";
            }
            this.dialogComponent = component || "Info";
            this.isShow = true;
            this.row=row;
        },
        // 确认关闭弹窗，接受子组件传来的方法，后期可用来接受子组件传来的弹窗表单值
        getSonSure(val) {
            this.isShow = false;
            console.log('弹窗关闭-----',this.isShow);
           setTimeout(() => {
               this.getTable();
           }, 500);
        },

    },
    created() {
        // console.log('1233333')
        // console.log("router",this.$route.matched.slice(1));
    },
    filters: {
        formatDate: function (value) {
            let date = new Date(value);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        }
    }
}