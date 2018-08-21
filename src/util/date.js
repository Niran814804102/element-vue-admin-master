/**
 * format the data from UTCString
 * */
export function formatTime(value){
  function padDate(value){
    return value < 10 ? '0' + value : value;
  }
  let date = new Date(value);
  let year = date.getFullYear();
  let month = date.getMonth()+1;
  let day = padDate(date.getDate());
  let hour = padDate(date.getHours());
  let minutes = padDate(date.getMinutes());
  let seconds = padDate(date.getSeconds());
  return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
}
export function dateFormat(time, format =  'yyyy-MM-dd HH:mm:ss') {
  let t = new Date(time);
  let tf = function (i) {
    return (i < 10 ? '0' : '') + i
  };
  return format.replace(/yyyy|MM|M|dd|d|HH|H|mm|m|ss|s/g, function (a) {
    switch (a) {
      case 'yyyy':
        return t.getFullYear();
      case 'MM':
        return tf(t.getMonth() + 1);
      case 'M':
        return t.getMonth() + 1;
      case 'dd':
        return tf(t.getDate());
      case 'd':
        return t.getDate();
      case 'HH':
        return tf(t.getHours());
      case 'H':
        return t.getHours();
      case 'mm':
        return tf(t.getMinutes());
      case 'm':
        return t.getMinutes();
      case 'ss':
        return tf(t.getSeconds());
      case 's':
        return t.getSeconds();
    }
  })
}
