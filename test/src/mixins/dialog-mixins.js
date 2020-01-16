export default {
    props: {
        type: {
            //弹窗类型，接收父组件传来的值，用于确定弹窗标题
            type: String,
            default: ""
        },
        isShow: {
            type: Boolean,
            default: false
        },
        row: ''
    },
    data() {
        return {
            dialogVisible: this.isShow,//弹窗是否关闭
            formLabelWidth: "120px",//弹窗宽度
            myHeaders: { },
        }
    },
    watch: {//在data中直接赋值，只会在实例初始化的时候渲染，所以需要用wathch方法进行监视
        isShow() {
            this.dialogVisible = this.isShow;
            // console.log(this.dialogVisible);
        },
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
        getToken() {
            let token = "bearer " + localStorage.getItem("Authorization");
            this.$set(this.myHeaders,'Authorization',token)
        }
    },

    created() {
        this.getToken();
    },

}