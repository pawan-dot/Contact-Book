class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    //search funtionality
    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,//mongodb operator regular expression
                    $options: "i",//case insensitive
                },
            }
            : {};
        //console.log(keyword)

        this.query = this.query.find({ ...keyword });
        return this;//same class written
    }



    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1; //neither page 1 show

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;