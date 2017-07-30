<template>
	<div class="wrapper">
		<section class="header">
			<div class="scanner">
				<img src="../assets/images/二维码.png" alt="">
				<input type="file" name="file"  capture="camera">
			</div>
			<router-link to="/search" class="search">
				<input type="search" placeholder="搜索宝贝/鱼塘/用户">
			</router-link>
			<div class="morekind" @click="category">
				<img src="../assets/images/分类.png" alt="">
			</div>
		</section>
		<div class="block"></div>
		<IndexBanner></IndexBanner>
		<IndexGoods :goodslist="goodslist"></IndexGoods>
		<IndexRecom :typelist="typelist"></IndexRecom>
		<IndexAd :ad="ad"></IndexAd>
		<IndexNav></IndexNav>
		<div class="block"></div>
		<NavBottom ></NavBottom>
	</div>	
</template>
<script>
import NavBottom from '../components/NavBottom'
import IndexBanner from '../components/IndexBanner.vue'
import IndexGoods from '../components/IndexGoods.vue'
import IndexRecom from '../components/IndexRecom.vue'
import IndexAd from '../components/IndexAd.vue'
import IndexNav from '../components/IndexNav.vue'
import {mapActions} from 'vuex'
import API from '../api/API'
const api = new API();
import {Toast} from 'mint-ui'
import { Indicator } from 'mint-ui'

export default {
	components: {
		IndexBanner,
		IndexGoods,
		IndexRecom,
		IndexAd,
		IndexNav,
		NavBottom
	},
	data () {
			return {
                list: [],
			 	goodslist: [],
			    typelist: [],
			    ad: []
			  }
	},
	mounted () {
		this.$store.dispatch('setCurindex', 0)
        this.axios.get(this.axios.defaults.baseURL + '/goodslist')
                .then((response) => {
                this.goodslist = response.data.goodslist
                    console.log(this.goodslist)
                })
                .catch(function (error) {
                    console.log(error)
                })

        let that = this;
        //获取信息列表
//        let param = { "StartYear": "2016", "EndYear": "2016"};
        let param = {};
        let response = api.getList('/users',param);
        response.then(function(res){
                    console.log(res.data.data);
                    if(!res.data.data){
                        that.list = [];
                        Toast({
                            message: '无数据',
                            duration: 2000
                        });
                    }
                    let data = res.data.data;
                    Indicator.close();
                    that.list = data;
                    console.log(that.list);
                })
                .catch(function(err){
                    console.log(err);
                    that.list = [];
                    Indicator.close();
                    Toast({
                        message: '无数据',
                        duration: 2000
                    });
                });


		this.axios.get(this.axios.defaults.baseURL + '/typelist')
			        .then((response) => {
			         	this.typelist = response.data.typelist
        				console.log(this.typelist)
			      })
			      .catch(function (error) {
			        console.log(error) 
			      })
		this.axios.get(this.axios.defaults.baseURL + '/ad')
			        .then((response) => {
			         	this.ad = response.data.ad
        				console.log(this.ad)
			      })
			      .catch(function (error) {
			        console.log(error) 
			      })
	},
	methods: {
		category () {
			this.$router.push({path:'/category'})
		}
	}
}
</script>
<style lang="scss" scoped>
.wrapper{
	width: 100%;
	min-height:70rem;
	position: relative;
	.block {
		height: 4.5rem;
	}
	.header{
		width: 100%;
		height: 4.5rem;
		background-color: #ffda44;
		z-index:10;
		position: fixed;
		top:0;
		display: -webkit-flex;
		display: flex;
		align-items: center;
		.scanner{
			width: 2rem;
			height: 2rem;
			margin-left: 1rem;
			margin-right: 1rem;
			img{
				width: 2rem;
				height: 2rem;
			}
			input{
				display: none;
			}
		}
		.search{
			flex:1;
			height: 3rem;
			display: flex;
			align-items: center;
			outline: none;
			border-radius:.4rem;
			border: none;
			padding-left: 2.8rem;
			background-color: #fff;
			background-image: url('../assets/images/search.png');
			background-repeat: no-repeat;
			background-size: 1.8rem 1.8rem;
			background-position: .8rem 50%;
			input {
				border: none;
			}
		}
		.morekind{
			width: 2rem;
			height: 2rem;
			margin-left: 1rem;
			margin-right: 1rem;
			img{
				width: 2rem;
				height: 2rem;
			}
		}
	}
	
}

</style>