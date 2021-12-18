import React from 'react';
import '../css/main.css'; 
const ImageList = (props :any) => {
    
    // function getImageLink(urls){
    //     props.getImageLink(urls);
    // }
    const sendUrl = (data :any) => {

        props.onClick(data);
        
    }
    const images = props.images.map(({id, description, urls} :any) => {
        
      return(
        
            <div className="card col-md-4" key={id}>
               <img onClick={() => sendUrl(urls.regular) } className="card-img-top" height={50} width={50} style={{ margin: '10px'}} src={urls.regular} alt={description}/>
            </div>
      ) 
    });
    return(
        <div className="modal fade show" style={{ display: "block", paddingRight: "17px"}} id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update User Info</h5>
                        <button type="button" className="close_btn" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    
                    <div className="modal-body">
                   
                    <div className="container">
                        <div className="card-group">
                            <div className="row">
                                {images}
                            </div>
                        </div>
                    </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ImageList;