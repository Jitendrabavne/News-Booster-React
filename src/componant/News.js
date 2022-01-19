import React, { useEffect, useState } from "react";
import NewItem from "./NewItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);

    props.setProgress(30);
    let parseData = await data.json();
    console.log(parseData);

    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `News Booster-${capitalizeFirstLetter(props.category)}`;
    updateNews();
    //eslint-disable-next-line
  }, []);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Buttons Handle Section in Arrow Function
  // const handlePreviousClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // };
  // const handleNextClick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // };
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pagesize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
  };

  return (
    <>
      <div className="container my-3">
        <h2
          className="text-center"
          style={{ margin: "40px 0px", marginTop: "90px" }}
        >
          News Booster-Top {capitalizeFirstLetter(props.category)} Headlines{" "}
        </h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div class="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4 " key={element.url}>
                    <NewItem
                      title={element.title ? element.title.slice(0, 99) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 99)
                          : ""
                      }
                      imgUrl={
                        element.urlToimage === ""
                          ? (element.urlToImage =
                              "https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/12/diasbled-in-space-1635769046-1640864701.jpg")
                          : element.urlToImage
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "sports",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes,
  category: PropTypes.string,
};
export default News;
