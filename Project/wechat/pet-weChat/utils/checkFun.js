	export default {
    isChars(rule, value){
      if(!/^([0-9a-zA-Z_]|[\u4E00-\u9FA5]){2,10}$/.test(value)){
        return rule.message
      }
    },
    isMobile(rule, value){
      if(!/^1[3-9]\d{9}$/.test(value)){
        return rule.message
      }
    },
    isImageCode(rule, value){
      if(!/^\d{4}$/.test(value)){
        return rule.message
      }
    },
    isPassword(rule, value){
      if(!/^.{8,20}$/.test(value)){
        return rule.message
      }
    },
    isRegion(rule, value){
      if(Array.isArray(value) && value[0]==='' ){
        return rule.message
      }
    }
  };