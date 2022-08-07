import axios from 'axios';

const URL: string = "http://localhost:8080";

class Service {

    upload(file: string | Blob, onUploadProgress: any) {
        let formData = new FormData();
        formData.append("file", file); 
        return axios.post(URL+"/CSVFileUpload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress,
        });
      }
  
    getFileData(page: number, size: number) {
      return axios.get(URL+"/data/"+ page + "/"+ size);
    }
  }
  
  export default new Service();