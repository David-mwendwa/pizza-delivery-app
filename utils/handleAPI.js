import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/index.js';

/**
 * A class handler function for API features
 * @query mongoose query - mongoose data model and it's find method @example Model.find({...})
 * @queryString express api query method @example req.query
 */
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFilds = ['page', 'sort', 'limit', 'fields'];
    excludedFilds.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

/**
 * A function to create a document
 * @param {*} Model - mongoose data model
 * @returns created document
 */
const createOne = (Model) => async (req, res, next) => {
  const doc = await Model.create(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: doc,
  });
};

/**
 * A function to query and get one document
 * @param {*} Model - mongoose data model
 * @param {*} populateOptions - options to parse to mongoose populate method
 * @returns one document
 */
const getOne = (Model, populateOptions) => async (req, res, next) => {
  let query = Model.findById(req.params.id);

  if (populateOptions) {
    query = query.populate(populateOptions);
  }
  const doc = await query;

  if (!doc) {
    throw new NotFoundError('No document found with that ID');
  }
  res.status(StatusCodes.OK).json({ success: true, data: doc });
};

/**
 * A function to query and get many documents
 * @param {*} Model - mongoose data model
 * @param {*} filterOption(Object) - additional query options that can be parsed on find method @example {userId: req.user._id}
 * @param {*} filterOption(String) - field name to make a search filter from @example name, product, description
 * @returns an array of one or more documents
 */
const getMany = (Model, filterOption) => async (req, res, next) => {
  let query = filterOption;
  let filter = {};
  // handle nested routes - param kay has to be similar to the property in the database @example {productId: req.params.productId}
  if (!!Object.keys(req.params).length) {
    for (const key in req.params) {
      filter[[key]] = req.params[key];
    }
  }
  if (typeof query === 'object' && !Array.isArray(query) && query !== null) {
    filter = Object.assign(filter, query);
  } else if (typeof query === 'string' || query instanceof String) {
    let searchField = query;
    const keyword = req.query[searchField]
      ? { [searchField]: { $regex: req.query[searchField], $options: 'i' } }
      : {};
    filter = Object.assign(filter, keyword);
  }

  const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  res.status(StatusCodes.OK).json({
    success: true,
    totalCount: doc.length,
    data: doc,
  });
};

/**
 * A function to update document by id
 * @param {*} Model - mongoose data model
 * @returns updated document
 */
const updateOne = (Model) => async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    throw new NotFoundError('No document found with that ID');
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: doc,
  });
};

/**
 * A function to delete document by id
 * @param {*} Model - mongoose data model
 * @returns null
 */
const deleteOne = (Model) => async (req, res, next) => {
  const doc = await Model.findByIdAndRemove(req.params.id);

  if (!doc) {
    throw new NotFoundError('No document found with that ID');
  }

  res.status(StatusCodes.NO_CONTENT).json({
    success: true,
    data: null,
  });
};

export { APIFeatures, getMany, getOne, createOne, updateOne, deleteOne };
