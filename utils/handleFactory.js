import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/index.js';

class APIFeatures {
  constructor(query, queryString) {
    // query: mongoose query, queryString: query from express api
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

const createOne = (Model) => async (req, res, next) => {
  const doc = await Model.create(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: { data: doc },
  });
};

const getOne = (Model, populateOptions) => async (req, res, next) => {
  let query = Model.findById(req.params.id);

  if (populateOptions) {
    query = query.populate(populateOptions);
  }
  const doc = await query;

  if (!doc) {
    throw new NotFoundError('No document found with that ID');
  }
  res.status(StatusCodes.OK).json({ success: true, data: { data: doc } });
};

const getAll = (Model, filterOption) => async (req, res, next) => {
  let query = filterOption;
  let filter = {};
  // Allow for nested routes -> param kay has to be similar to the property in the database i.e {productId: req.params.productId}
  if (!!Object.keys(req.params).length) {
    for (const key in req.params) {
      filter[[key]] = req.params[key];
    }
  }
  if (typeof query === 'object' && !Array.isArray(query) && query !== null) {
    // Allows for additional options that can be parsed in find method i.e {userId: req.user.userId}
    filter = Object.assign(filter, query);
  } else if (typeof param === 'string' || param instanceof String) {
    // Allow for search functionality through value keyword -> accepts field name to search from i.e name, product, description etc
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
    data: { data: doc },
  });
};

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
    data: { data: doc },
  });
};

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

export { getAll, getOne, createOne, updateOne, deleteOne };
