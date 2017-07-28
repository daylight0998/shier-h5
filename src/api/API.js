import axios from 'axios'
import config from './config'
import qs from 'qs'
import {hex_md5,b64_md5} from './md5';

// axios(config);
class API {
    getkey (params) {
        var appSecret = '!Q@W#E$R';
        var timestamp=new Date().getTime();
        if(!params){
            params={}
        }
        params.timestamp = timestamp.toString();
        var newData = JSON.stringify(params) + "|" + appSecret;
        var sign = hex_md5(newData);
        return sign;
        //var options={};
        //options.params=params;
        //options.headers={"sign":sign};
    }

    getList (url,param) {

		//config.data.Method="get";
		config.params = param;
        config.headers.sign = this.getkey(param);
        //console.log(config.headers);
		//config.data.CustData.Data = param;
		return axios.get(axios.defaults.baseURL + url,config);
	}
	//getCurrency (url,param) {
	//	console.log(config);
	//	var commonData = Object.create(config);
	//
	//	config.data.Method="get";
	//	config.data.CustData.Data = param;
	//	return axios.post(axios.defaults.baseURL +url,{},config);
	//}
}
export default API;
