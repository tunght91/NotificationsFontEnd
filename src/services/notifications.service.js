import ApiService from './api.service'
const NotificationsService = {
    /**
    **/
    list: async function(param) {
        const {page,limit} = param
        const requestData = {
            method: 'get',
            url: "/notifications",    
        }
        try {
            return await ApiService.customRequest(requestData);
        } catch (error) {
            console.log(error);
        }
    },
    create: async function(param){
        console.log(param);
        const requestData = {
            method: 'post',
            url: "/notifications", 
            data: param   
        }
        try {
            return await ApiService.customRequest(requestData);
           
        } catch (error) {
            debugger
            console.log(error);
        } 
    },
    item: async function (param){
        var id = param.id
        try {
            const requestData = {
                method: 'get',
                url: `/notifications/${id}`,
            }
            return await ApiService.customRequest(requestData);
        }catch (error) {
            console.log(error);
        }
    }

}

export default NotificationsService