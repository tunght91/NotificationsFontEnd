import ApiService from "./api.service";
const NotificationsService = {
  /**
   **/
  list: async function(param) {
    const { page, limit } = param;
    const requestData = {
      method: "get",
      url: "/notifications/all"
    };

    return await ApiService.customRequest(requestData);
  },
  create: async function(param) {
    const requestData = {
      method: "post",
      url: "/notifications",
      data: param
    };
    return await ApiService.customRequest(requestData);
  },
  push: async function(param) {
    var id = param.id;
    const requestData = {
      method: "post",
      url: `/notifications/push/${id}`
    };
    return await ApiService.customRequest(requestData);
  },
  update: async function(param) {
    var id = param.id;
    console.log(param);
    debugger;
    const requestData = {
      method: "put",
      url: `/notifications/${id}`,
      data: param
    };
    return await ApiService.customRequest(requestData);
  },
  item: async function(param) {
    var id = param.id;
    try {
      const requestData = {
        method: "get",
        url: `/notifications/${id}`
      };
      return await ApiService.customRequest(requestData);
    } catch (error) {
      console.log(error);
    }
  },
  urlMetaData: async function(param) {
    const requestData = {
      method: "post",
      url: "/notifications/meta",
      data: param
    };

    return await ApiService.customRequest(requestData);
  }
};

export default NotificationsService;
