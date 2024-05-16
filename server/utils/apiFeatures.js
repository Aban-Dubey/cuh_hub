class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        if (this.queryStr.keyword) {
          const keyword = new RegExp(this.queryStr.keyword, 'i');
          this.query = this.query.find({ category: { $regex: keyword } });
        }
        return this;
      }

    filter() {  //case sensitive
        const queryCopy = {...this.queryStr};
        //Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key)=> delete queryCopy[key]);

        //filter for price and rating
        let queryStr = JSON.stringify(queryCopy); 
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=>`$${key}`); //Adding a dollar sign before gt,gte,lt,lte

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1; //to get hold of the current working page
        const skip = resultPerPage*(currentPage-1); //to get to know how many are to be skipped so that only desired number of products are visible
        this.query = this.query.limit(resultPerPage).skip(skip); //limit and skip the functions of mongodb. this.query works same as Product.find()
        return this;
    }
}

export default ApiFeatures;