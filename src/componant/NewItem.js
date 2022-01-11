import React, { Component } from "react";

export class NewItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl,date,author,source  } = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem"  }}> 
        <div style={{display:'flex', justifyContent:'flex-end', position:'absolute ',right:'0'}}>

        <span className=" badge rounded-pill bg-danger"  >
  {source} 99+
  </span>
        </div>
          <img src={!imgUrl?"https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/12/diasbled-in-space-1635769046-1640864701.jpg":imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
          
            <h5 className="card-title">{title}...<span className="badge bg-success">New</span></h5>
            <p className="card-text">{description}...</p> 
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer"  href={newsUrl} target="_blank" className="btn btm-sm btn-success">
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewItem;
