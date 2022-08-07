import React, { Component } from "react";
import ProgressBar from "./progress-bar";
import TableData from "./data-table";
import service from "./service";
import { Data } from "./model";

class FileUpload extends Component { 

state: {selectedFile: any, progress: number, data: Data[], totalPages: number, msg: string} = { 
    selectedFile: null,
    progress: 0,
    data: [],
    totalPages: 0,
    msg: ''
  }; 
  onFileChange = (event: any) => { 
    this.setState({ selectedFile: event.target.files[0] }); 
  }; 

  onFileUpload = () => { 

  service.upload(this.state.selectedFile, (progressEvent: ProgressEvent) => {
              let percentComplete: number = progressEvent.loaded / progressEvent.total
              percentComplete = (percentComplete * 90);
              console.log(percentComplete);
              this.setState({
                progress: percentComplete
              });
            })
            .then((response)=>{
              if(response.status === 200) {
                  this.setState({
                    progress: 100,
              }); 
              service.getFileData(1, 50).then((response)=>{
                  if(response.status ===200) {
                        this.setState({
                          progress: 0,
                          data: response.data.content,
                          totalPages: response.data.totalPages
                        });
                    } else {
                      this.setState({
                        progress: 0,
                        data: [],
                        totalPages: 0,
                        msg: 'Internal server error'
                      })
                    }
           }); 
        } else {
            this.setState({
              progress: 0,
              data: [],
              totalPages: 0,
              msg: 'file upload failed'
            })
        }
    }).catch((error) => {
      this.setState({
        progress: 0,
        data: [],
        totalPages: 0,
        msg: 'Internal server error'
      })
    });
  }; 

 updateProgress(percentComplete: number) {
  this.state.progress = percentComplete;
  }

  render() { 
    return ( 
      <div> 
          <h3> 
            File Upload
          </h3> 
          <div> 
              <input type="file" onChange={this.onFileChange} /> 
              <button onClick={this.onFileUpload}> 
                Upload! 
              </button> 
              {this.state.progress>0 && <ProgressBar bgcolor={"#6a1b9a"} completed={this.state.progress} />}
              {this.state.msg.length>0 && this.state.msg}
              <TableData data={this.state.data} totalPages={this.state.totalPages}/>
          </div> 
      </div> 
    ); 
  } 
} 

export default FileUpload