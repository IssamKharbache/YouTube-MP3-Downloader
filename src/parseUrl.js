export const  getIDfromURL = (url) => {
    const arr = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  
    if (arr[2] !== undefined) {
      return arr[2].split(/[^0-9a-z_\-]/i)[0];
    }
  
    return url[0];
  }

