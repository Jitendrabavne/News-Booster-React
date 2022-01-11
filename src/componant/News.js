import React, { Component } from "react";
import NewItem from "./NewItem";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";
export class News extends Component { 
  static defaultProps  ={
    country:'in',
    pageSize:6,
    category:'sports'
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes,
    category:PropTypes.string
  }

  articles = [
    {
      source: { id: "bbc-sport", name: "BBC Sport" },
      author: "BBC Sport",
      title: "Ex-India off-spinner Harbhajan retires",
      description:
        "Former India off-spinner Harbhajan Singh retires from all forms of cricket, making the announcement in a social media post.",
      url: "http://www.bbc.co.uk/sport/cricket/59781100",
      urlToImage:
        "",
      publishedAt: "2021-12-24T11:07:26.491929Z",
      content:
        "Harbhajan Singh (left) watched on from the dugout and changing room as the delayed Indian Premier League was completed in the United Arab Emirates in October\r\nFormer India off-spinner Harbhajan Singh… [+2009 chars]",
    },
    {
      source: { id: "espn-cric-info", name: "ESPN Cric Info" },
      author: null,
      title:
        "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      description:
        "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      publishedAt: "2020-04-27T11:41:47Z",
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      source: { id: "espn-cric-info", name: "ESPN Cric Info" },
      author: null,
      title:
        "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      description:
        "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      publishedAt: "2020-03-30T15:26:05Z",
      content:
        "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    },
  ];
 
async updateNews( ){
  this.props.setProgress(10);
   const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true})
      let data = await fetch(url);
      
  this.props.setProgress(30);
    let parseData = await data.json(); 
    console.log(parseData);
    
  this.props.setProgress(70);

    this.setState({ articles: parseData.articles,
     totalResults:parseData.totalResults,
                    loading:false     });
     this.props.setProgress(100);
  }
async componentDidMount(){
    console.log("cdm");
    this.updateNews()
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=69edc13440f0485dbc948bfcb1b301bb&page=1&pagesize=${this.props.pageSize}`;
    // this.setState({loading:true})
    //   let data = await fetch(url);
    // let parseData = await data.json(); 
    // console.log(parseData);

    // this.setState({ articles: parseData.articles,
    //  totalResults:parseData.totalResults,
    //                 loading:false     });
  } 

  capitalizeFirstLetter=(string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props) {
    super(props);
    console.log("My Constructor from news.js");
    this.state = {
      articles: [],
      loading:true,
      page:1,
      totalResults:0
    };
    document.title=`News Booster-${this.capitalizeFirstLetter(this.props.category)}`
  }
  // Buttons Handle Section in Arrow Function
  handlePreviousClick= async ()=>{
  console.log('Previous')
//   let url =
//   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=69edc13440f0485dbc948bfcb1b301bb&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
// this.setState({loading:true});
//   let data = await fetch(url);
// let parseData = await data.json(); 
// console.log(parseData);  
//   this.setState({
//     page:this.state.page-1, 
//     articles: parseData.articles,
//     loading:false

//   })
    
  this.setState({page:this.state.page-1});
  this.updateNews()
}
  handleNextClick = async ()=>{
    console.log('Next')
  //   if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
  //     this.setState({loading:true});
    
  //   let url =
  //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=69edc13440f0485dbc948bfcb1b301bb&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  // let data = await fetch(url);
  // let parseData = await data.json(); 
  
  //   this.setState({
  //     page:this.state.page+1, 
  //     articles: parseData.articles,
  //     loading:false

  //   })
  // }
  this.setState({page:this.state.page+1}); 
  this.updateNews()
     
  }
  fetchMoreData= async ()=>{
    this.setState({page:this.state.page+1});
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
     
      let data = await fetch(url);
    let parseData = await data.json(); 
    console.log(parseData); 
    this.setState({ articles: this.state.articles.concat(parseData.articles),
     totalResults:parseData.totalResults     });
  }
  render() {
    console.log("Render");
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{margin:'40px 0px'}}>News Booster-Top  {this.capitalizeFirstLetter(this.props.category)}  Headlines </h2>
       {this.state.loading&&<Spinner/>}
         <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>} >
        
        <div class="container">
        <div className="row">
          {/* {!this.state.loading&&this.state.articles.map((element) => { */}
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4 " key={element.url}>
                <NewItem
                  title={element.title ? element.title.slice(0, 99) : ""}
                  description={
                    element.description ? element.description.slice(0, 99) : ""
                  }
                  imgUrl={element.urlToimage===""?element.urlToImage="https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/12/diasbled-in-space-1635769046-1640864701.jpg":element.urlToImage}
                  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
         
      </div>
    );
  }
}
export default News;
